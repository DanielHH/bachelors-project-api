import { SqlUtilities } from "./sql-utilities";
import { Card } from "../datamodels/card";
import { CardDTO } from "../DTO/cardDTO";
import { Document } from "../datamodels/document";
import * as _ from 'lodash';
import { userInfo } from "os";
import * as moment from 'moment';
import { DocumentDTO } from "../DTO/documentDTO";
import { VerificationDTO } from "../DTO/verificationDTO";
import { Receipt } from "../datamodels/receipt";
import { resolve } from "path";



export class PdfUtilities {


  templatePath = './pdfTemplates/';
  sqlUtil: SqlUtilities;
  fs = require('fs');
  ejs = require('ejs');
  pdf = require('html-pdf')
  merge = require('easy-pdf-merge');

  constructor() {
    this.sqlUtil = new SqlUtilities();
  }

  generatePDF(data?: any[]) {
    // Get packages
    let template = " ";
    // Read and compile variable html template
    const pdfType = data[0];
    let html;
    switch (pdfType) {
      case "card": html = this.createCardReceipt(data[1]); break;
      case "document": html = this.createDokReceipt(data[1]); break;
      case "inventory": return this.createInventory(data[1]).then(res => {
        return new Promise((resolve,reject) => { resolve(res);})});        
      case "filteredInventory":
      case "filtered":
      default: html = this.fs.readFileSync(this.templatePath + "/inventory_template.html", 'utf8'); break;
    }

    //const card = this.getData(data[1]);


    //html = fs.readFileSync(this.templatePath + template, 'utf8');
    //var compiled = ejs.compile(fs.readFileSync(this.templatePath + template, 'utf8'));
    // Add variables to template
    /*var html = compiled({ serNumber : card.cardNumber , info : card, type: "type", sender: "sender",
                          dokDate: "Date of dokument", arrDate: "Date of arrival", receiver: "recipient",
                          comment: "comment", location: "location", curDate: new Date() });*/

    // Create and save pdf
    const pdfFileName = pdfType + '_' + _.replace(data[1].user.name, /[/\s\\?%*:|"<>]/g, '', ) + '_' +
      moment(data[1].modifiedDate).format('YYYY-MM-DD') + '.pdf';
    const pdfFilePath = './pdfs/' + pdfFileName;

    const options = { format: 'A4', type: 'pdf', base: 'file:///' + _.replace(__dirname, /\\/g, '/')};

    return new Promise((resolve, reject) => {
      this.pdf.create(html, options).toFile(pdfFilePath, (err, res) => {
        if (!err) {
          data[2].url = pdfFileName;
          this.sqlUtil.sqlUpdate('Receipt', new Receipt(data[2])).then(success => {
            if (success) {
              resolve(pdfFilePath.substring(1));
            }
            else {
              reject(success);
            }
          });          
        }
        else {
          reject(err);
        }
      });
    });


  }

  createCardReceipt(body: CardDTO) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/card/card_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({
      serNumber: body.cardNumber, type: body.cardType.name, user: body.user.name,
      expDate: body.expirationDate, comment: body.comment,
      location: body.location, curDate: moment(body.modifiedDate).format('YYYY-MM-DD')
    });
  }

  createDokReceipt(body: DocumentDTO) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/document/document_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({
      serNumber: body.documentNumber, info: body.name, type: body.documentType.name, sender: body.sender,
      dokDate: moment(body.documentDate).format('YYYY-MM-DD'), arrDate: moment(body.registrationDate).format('YYYY-MM-DD'), receiver: body.user.name,
      comment: body.comment, location: body.location, curDate: moment(body.modifiedDate).format('YYYY-MM-DD')
    });
  }

  createInventory(inventory: VerificationDTO[]) {
    let items = inventory.length
    if (items <= 13) {
      return this.inventory(items, inventory, 'start', 1, 1);
    } else {
      const pages = Math.ceil((items - 13) / 14) + 1;
      const compStart = this.inventory(13, inventory, 'start', 1, 1);
      items -= 13;
      let leftInventory = inventory.slice(13);
      const compExtra: any[] = [pages - 1];
      for (let page = 2; page < pages; page++) {
        compExtra[page - 2] = this.inventory(items, leftInventory, 'extra', page, pages);
        if (items > 14) {
          items -= 14;
          leftInventory = leftInventory.slice(14);
        }
      }

      var pdfFilePath = './pdfs/inventory';
      const options = { format: 'A4', type: 'pdf', base: 'file:///' + _.replace(__dirname, /\\/g, '/')};
      this.pdf.create(compStart, options).toFile(pdfFilePath + '_start.pdf', function (err, res2) {
        if (err) return console.log(err);
        console.log(res2);
      });

      const files: any[] = [pages];
      files.push(pdfFilePath + '_start.pdf');
      let currentPath: string;

      let promise = new Promise((resolve, reject) => {
        for (let i = 0; i < pages - 1; i++) {
          currentPath = pdfFilePath + '_' + i + '.pdf';
          this.pdf.create(compExtra[i], options).toFile(currentPath, (err,res) => {
            if (err) {
              reject(err);
            }
          })
          files.push(currentPath);
        }
      }).then(() => {
        return new Promise((resolve,reject) => {
        const dest_path = './pdfs/inventory_' + moment(new Date).format('YYYY-MM-DD') + '.pdf';
        var merge = require('easy-pdf-merge');
        merge(files, dest_path, function (err) {
          if (!err) {
            resolve(dest_path.substring(1));
          }
          else {
            reject(err)
          }
        });
      });
      }).then(result => {
        return new Promise((resolve, reject) => {
        for (let str in files){
          this.fs.unlink(str, (err2) => {
            if (!err2) {
              resolve(result);
            }
          });
        };
      });
      });
    }

  }


  inventory(length: number, items: VerificationDTO[], template: string, curPage: number, pages: number) {
    let type: any[14] = new Array(14);
    let number: any[14] = new Array(14);
    let user: any[14] = new Array(14);
    let location: any[14] = new Array(14);
    let comment: any[14] = new Array(14);

    let done = false;
    let i = 0
    while (i < 14) {
      type[i] = number[i] = user[i] = location[i] = comment[i] = "";
      if (i < length) {
        const item = items[i];
        type[i] = item.itemType.name;
        
        switch (type[i]) {
          case 'Card':  number[i] = item.card.cardNumber;
                        location[i] = item.card.location;
                        comment[i] = item.card.comment;
                        break;

          case 'Document': number[i] = item.document.documentNumber;
                           location[i] = item.document.location;
                           comment[i] = item.document.comment;
                           break;
          default: type[i] = number[i] = user[i] = location[i] = comment[i] = "";
        }

        if (item.user){ 
          user[i] = item.user.name;
        }
      }
      i++;
    }

    switch (template) {
      case 'start': return this.fillInvStart(type, number, user, location, comment, curPage, pages);
      case 'extra': return this.fillInvExtra(type, number, user, location, comment, curPage, pages);
    }
  }

  fillInvStart(type, number, user, location, comment, curPage, pages) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/inventory_template_base.html", 'utf8'));
    // Add variables to template
    return compiled({
      type1: type[0], number1: number[0], user1: user[0], location1: location[0], comment1: comment[0],
      type2: type[1], number2: number[1], user2: user[1], location2: location[1], comment2: comment[1],
      type3: type[2], number3: number[2], user3: user[2], location3: location[2], comment3: comment[2],
      type4: type[3], number4: number[3], user4: user[3], location4: location[3], comment4: comment[3],
      type5: type[4], number5: number[4], user5: user[4], location5: location[4], comment5: comment[4],
      type6: type[5], number6: number[5], user6: user[5], location6: location[5], comment6: comment[5],
      type7: type[6], number7: number[6], user7: user[6], location7: location[6], comment7: comment[6],
      type8: type[7], number8: number[7], user8: user[7], location8: location[7], comment8: comment[7],
      type9: type[8], number9: number[8], user9: user[8], location9: location[8], comment9: comment[8],
      type10: type[9], number10: number[9], user10: user[9], location10: location[9], comment10: comment[9],
      type11: type[10], number11: number[10], user11: user[10], location11: location[10], comment11: comment[10],
      type12: type[11], number12: number[11], user12: user[11], location12: location[11], comment12: comment[11],
      type13: type[12], number13: number[12], user13: user[12], location13: location[12], comment13: comment[12],
      curDate: moment(new Date()).format('YYYY-MM-DD'), curPage: curPage, totalPage: pages
    });
  }

  fillInvExtra(type, number, user, location, comment, curPage, pages) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/inventory_template_extra.html", 'utf8'));
    // Add variables to template
    return compiled({
      type1: type[0], number1: number[0], user1: user[0], location1: location[0], comment1: comment[0],
      type2: type[1], number2: number[1], user2: user[1], location2: location[1], comment2: comment[1],
      type3: type[2], number3: number[2], user3: user[2], location3: location[2], comment3: comment[2],
      type4: type[3], number4: number[3], user4: user[3], location4: location[3], comment4: comment[3],
      type5: type[4], number5: number[4], user5: user[4], location5: location[4], comment5: comment[4],
      type6: type[5], number6: number[5], user6: user[5], location6: location[5], comment6: comment[5],
      type7: type[6], number7: number[6], user7: user[6], location7: location[6], comment7: comment[6],
      type8: type[7], number8: number[7], user8: user[7], location8: location[7], comment8: comment[7],
      type9: type[8], number9: number[8], user9: user[8], location9: location[8], comment9: comment[8],
      type10: type[9], number10: number[9], user10: user[9], location10: location[9], comment10: comment[9],
      type11: type[10], number11: number[10], user11: user[10], location11: location[10], comment11: comment[10],
      type12: type[11], number12: number[11], user12: user[11], location12: location[11], comment12: comment[11],
      type13: type[12], number13: number[12], user13: user[12], location13: location[12], comment13: comment[12],
      type14: type[13], number14: number[13], user14: user[13], location14: location[13], comment14: comment[13],
      curDate: moment(new Date()).format('YYYY-MM-DD'), curPage: curPage, totalPage: pages
    });
  }



}