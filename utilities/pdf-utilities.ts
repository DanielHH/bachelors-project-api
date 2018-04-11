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
import { start } from "repl";
import { ReceiptDTO } from "../DTO/receiptDTO";



export class PdfUtilities {


  static templatePath = './pdfTemplates/';
  sqlUtil: SqlUtilities;
  static fs = require('fs');
  static ejs = require('ejs');
  static pdf = require('html-pdf')
  static merge = require('easy-pdf-merge');
  static options = { format: 'A4', type: 'pdf', base: 'file:///' + _.replace(__dirname, /\\/g, '/')};

  constructor() {
    this.sqlUtil = new SqlUtilities();
  }

  generatePDF(data?: any[]) {
    // Read and compile variable html template
    const pdfType = data[0];
    switch (pdfType) {
      case "card": return this.createCardReceipt(data[1], data[2], pdfType);
      case "document": return this.createDokReceipt(data[1], data[2], pdfType);
      case "inventory": return this.createInventory(data[1]);      
      case "receipts": return this.createReceiptList(data[1]);
      case "documents": return this.createDokList(data[1]);
      case "cards": return this.createCardList(data[1]);
    }
  }

  createCardReceipt(body: CardDTO, receipt, pdfType) {
    const compiled = PdfUtilities.ejs.compile(PdfUtilities.fs.readFileSync(PdfUtilities.templatePath + "/card/card_receipt_template.html", 'utf8'));
    // Add variables to template
    const html = compiled({
      serNumber: body.cardNumber, type: body.cardType.name, user: body.user.name,
      expDate: body.expirationDate, comment: body.comment,
      location: body.location, curDate: moment(body.modifiedDate).format('YYYY-MM-DD')
    });

    return this.receiptPromise(html, receipt, pdfType, body);
  }

  createDokReceipt(body: DocumentDTO, receipt, pdfType) {
    const compiled = PdfUtilities.ejs.compile(PdfUtilities.fs.readFileSync(PdfUtilities.templatePath + "/document/document_receipt_template.html", 'utf8'));
    // Add variables to template
    const html =compiled({
      serNumber: body.documentNumber, info: body.name, type: body.documentType.name, sender: body.sender,
      dokDate: moment(body.documentDate).format('YYYY-MM-DD'), arrDate: moment(body.registrationDate).format('YYYY-MM-DD'), receiver: body.user.name,
      comment: body.comment, location: body.location, curDate: moment(body.modifiedDate).format('YYYY-MM-DD')
    });
    return this.receiptPromise(html, receipt, pdfType, body);

  }

  createInventory(inventory: VerificationDTO[]) {
    return this.generatePages(this.inventory, inventory, '/inventory');
  }

  createReceiptList(receiptsList: ReceiptDTO[]){
    return this.generatePages(this.receipts, receiptsList, '/receipts');
  }

  createDokList(documents: DocumentDTO[]){
    return this.generatePages(this.documents, documents, '/receipts');
  }

  createCardList(cards: CardDTO[]){
    return this.generatePages(this.cards, cards, '/cards');
  }

  cards(length, cards: CardDTO[], template, curPage, pages){
    let items = [];
    let status, type, number, user, endDate, sender, comment, location;

    let done = false;
    let i = 0
    while (i < length) {
        const card = cards[i];
        type = card.cardType
        status = card.status.name;
        number = card.cardNumber;
        comment = card.comment;
        location = card.location;
        endDate = card.expirationDate;

        if (card.user){ 
          user = card.user.name;
        }
      i++;
      items.push([status, type, number, user, location, comment, endDate]);
    }

    return PdfUtilities.fillTemplate(items, curPage, pages, '/card/card_template_' + template + '.html');
  }
  
  documents(length, documents: DocumentDTO[], template, curPage, pages) {
    let items = [];
    let status, type, number, user, desc, sender, comment, location;

    let done = false;
    let i = 0
    while (i < length) {
        const document = documents[i];
        type = document.documentType
        status = document.status.name;
        number = document.documentNumber;
        desc = document.name;
        sender = document.sender;
        comment = document.comment;
        location = document.location;

        if (document.user){ 
          user = document.user.name;
        }
      i++;
      items.push([status, number, desc, type, sender, comment, location]);
    }

    return PdfUtilities.fillTemplate(items, curPage, pages, '/document/document_template_' + template + '.html');
  }

  receipts(this: PdfUtilities, length, receipts: ReceiptDTO[], template, curPage, pages) {
    let items = [];
    let status, type, number, user, startDate, endDate;

    let done = false;
    let i = 0
    while (i < length) {
      type = number = user = startDate = endDate = "";
        const receipt = receipts[i];
        type = receipt.itemType.name;
        switch (type) {
          case 'Card':  number = receipt.card.cardNumber;
                        startDate = receipt.startDate;
                        endDate = receipt.endDate;
                        break;

          case 'Document': number = receipt.document.documentNumber;
                           startDate = receipt.startDate;
                           endDate = receipt.endDate;
                           break;
          default: type = number = user = startDate = endDate = "";
        }

        status = receipt.endDate ? 'Inaktiv' : "Aktiv";

        if (receipt.user){ 
          user = receipt.user.name;
        }
      i++;
      items.push([status, type, number, user, startDate, endDate])
    }
    return PdfUtilities.fillTemplate(items, curPage, pages, "/receipt/receipt_template_" + template + ".html")
  }

  inventory(length: number, verifications: VerificationDTO[], template: string, curPage: number, pages: number) {
    let items = [];
    let type, number, user, location, comment;

    let done = false;
    let i = 0
    while (i < length) {
      type = number = user = location = comment = "";
      if (i < length) {
        const verification = verifications[i];
        type = verification.itemType.name;
        
        switch (type) {
          case 'Card':  number = verification.card.cardNumber;
                        location = verification.card.location;
                        comment = verification.card.comment;
                        break;

          case 'Document': number = verification.document.documentNumber;
                           location = verification.document.location;
                           comment = verification.document.comment;
                           break;
          default: type = number = user = location = comment = "";
        }

        if (verification.user){ 
          user = verification.user.name;
        }
      }
      i++;
      items.push(['', type, number, user, location, comment])
    }

    return PdfUtilities.fillTemplate(items, curPage, pages, '/inventory/inventory_template_' + template + '.html');
  }

  generatePages(func: Function, itemList: any[], path){
    let items = itemList.length
    const itemsThatFit = 20;
    if (items <= itemsThatFit) {
      return this.filePromise(func(items, itemList, 'base', 1, 1), path);
    } else {
      const pages = Math.ceil((items - itemsThatFit) / (itemsThatFit+2))+1;
      const startPage = func(itemsThatFit, itemList, 'base', 1, pages);
      
      items -= itemsThatFit;
      let itemsLeft = itemList.slice(itemsThatFit);
      const extraPages: any[] = new Array(pages - 1);

      for (let page = 2; page <= pages; page++) {
        extraPages[page - 2] = func(itemsThatFit+2, itemsLeft, 'extra', page, pages);
        if (items > itemsThatFit+2) {
          items -= itemsThatFit+2;
          itemsLeft = itemsLeft.slice(itemsThatFit+2);
        }
      }

      var pdfFilePath = './pdfs' + path;
      return this.pdfPagesSync(pages, pdfFilePath, extraPages, startPage)

    }
  }

  static fillTemplate(items, curPage, pages, template){
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + template, 'utf8'));
    return compiled({items: items, curPage: curPage, totalPage: pages, curDate: moment(new Date()).format('YYYY-MM-DD')});
  }

  filePromise(html, path){
    var pdfFilePath = './pdfs' + path + '_' + moment(new Date).format('YYYY-MM-DD') + '.pdf';;
      return new Promise((resolve, reject) => {
        PdfUtilities.pdf.create(html, PdfUtilities.options).toFile(pdfFilePath, (err, res) => {
          if (!err) {
            resolve(pdfFilePath.substring(1));          
          }
          else {
            reject(err);
          }
        });
      });
  }

  receiptPromise(html, receipt, pdfType, object){
    const pdfFileName = pdfType + '_' + _.replace(object.user.name, /[/\s\\?%*:|"<>]/g, '', ) + '_' +
      moment(object.modifiedDate).format('YYYY-MM-DD') + '.pdf';
    const pdfFilePath = './pdfs/' + pdfFileName;
    return new Promise((resolve, reject) => {
      PdfUtilities.pdf.create(html, PdfUtilities.options).toFile(pdfFilePath, (err, res) => {
        if (!err) {
          receipt.url = pdfFileName;
          this.sqlUtil.sqlUpdate('Receipt', new Receipt(receipt)).then(success => {
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

  pdfPagesSync(pages, pdfFilePath, extraPages, startPage){
    const files = [];
    let currentPath: string;

    async function sleep(ms) {
      return await (() => { return new Promise(resolve => setTimeout(resolve, ms))});
    }

    return new Promise((resolve, reject) => {
        PdfUtilities.pdf.create(startPage, PdfUtilities.options).toFile(pdfFilePath + '_start.pdf', function (err, res) {
          if (err) reject(err);
          else{
            files.push(pdfFilePath + '_start.pdf');
            resolve(res);
          }
        });
      }).then(() => new Promise((resolve, reject) => {
      for (let i = 0; i < pages - 1; i++) {
        currentPath = pdfFilePath + '_' + i + '_extra.pdf';
        PdfUtilities.pdf.create(extraPages[i], PdfUtilities.options).toFile(currentPath, (err,res) => {
          if (err) {
            reject(err);
          }
        })
        files.push(currentPath);
      }
      resolve();
    })).then(() => {
      return new Promise((resolve,reject) => {
      const dest_path = pdfFilePath + '_' + moment(new Date).format('YYYY-MM-DD') + '.pdf';
      var merge = require('easy-pdf-merge');
      console.log(files);

      sleep(5000);
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
      for (let i = 0; i < files.length; i++){
        console.log(files[i]);
        sleep(2000);
        PdfUtilities.fs.unlink(files[i], (err) => {
          if (err) {
            reject(err);
          }
        });
      }
      console.log(result);
      resolve(result);
    });
    });
  }
}