import { SqlUtilities } from "./sql-utilities";
import { Card } from "../datamodels/card";
import { CardDTO } from "../DTO/cardDTO";
import { Document } from "../datamodels/document";
import * as _ from 'lodash';
import { userInfo } from "os";



export class PdfUtilities {


  templatePath = './pdfTemplates/';
  sqlUtil: SqlUtilities;
  fs = require('fs');
  ejs = require('ejs');
  pdf = require('html-pdf')

  constructor(sqlUtil?: SqlUtilities) {
    //this.sqlUtil = sqlUtil;
  }
  
  generatePDF(data?: any[]) {
    console.log(data);
    // Get packages
    let template = " ";
    // Read and compile variable html template
    const pdfType = data[0];
    let html;
    switch (pdfType) {
      case "card": html = this.createCardReceipt(data[1]); break;
      case "document": html = this.createDokReceipt(data[1]); break;
      case "inventory": return this.createInventory();
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
    var pdfFilePath = './pdfs/receipt.pdf';
    var options = { format: 'A4' };
    this.pdf.create(html, options).toFile(pdfFilePath, function(err, res2) {
      if (err) return console.log(err);
      console.log(res2);
    });

    return pdfFilePath;
  }


  /*getCardData(id: any){
    const query = 'SELECT * FROM Card WHERE Card.ID = ' + id + ' ,' +
       'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
       'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
       'User.UserType, User.Username, User.Name, User.Email ' + 
       'FROM Card LEFT JOIN (CardType, StatusType) ON (CardType.ID=Card.CardType AND StatusType.ID=Card.Status) LEFT JOIN (User) ON (User.ID=Card.UserID)';
   const sqlUtil = new SqlUtilities();
   sqlUtil.sqlSelectQuery(query).then((cardList: any[]) => {
        cardList.map(card => {
          return new CardDTO(card);
        }
      );
    });
    return new CardDTO();
  }*/

  createCardReceipt(body: any[]) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/card_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({ serNumber : body[0] , type: body[1], user: body[2],
                          expDate: body[3], comment: body[4],
                          location: body[5], curDate: body[6] });
  }

  createDokReceipt(body: any[]) {
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/dok_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({ serNumber : body[0] , info : body[1], type: body[2], sender: body[3],
                          dokDate: body[4], arrDate: body[5], receiver: body[6],
                          comment: body[7], location: body[8], curDate: body[9] });
  }
  
  createInventory() {
    const inventory = [] //= this.sqlUtil.sqlSelectQuery("");
    let items = inventory.length
    if (items <= 13){
      return this.inventory(items, inventory, 'start', 1, 1);
    } else {
      const pages = Math.ceil((items-13)/14)+1;
      const compStart = this.inventory(13, inventory, 'start', 1, 1);
      items -= 13;
      let leftInventory = inventory.slice(13);
      const compExtra: any[] = [pages-1];
      for(let page = 2; page < pages; page++){
        compExtra[page-2] = this.inventory(items, leftInventory, 'extra', page, pages);
        if (items > 14){
          items -= 14;
          leftInventory = leftInventory.slice(14);
        }
      }

      var pdfFilePath = './pdfs/inventory';
      var options = { format: 'A4' };
      this.pdf.create(compStart, options).toFile(pdfFilePath + '_start.pdf', function(err, res2) {
        if (err) return console.log(err);
        console.log(res2);
      });

      const files: any[] = [pages];
      files.push(pdfFilePath + '_start.pdf');
      let currentPath: string;
      for( let i = 0; i < pages-1; i++){
        currentPath = pdfFilePath + '_' + i + '.pdf';
        this.pdf.create(compExtra[i], options).toFile(currentPath)
        files.push(currentPath);
      }

      let dest_path = './pdfs/receipt.pdf';
      var merge = require('easy-pdf-merge');
      merge(files, dest_path, function(err){
        if (err) {
          return console.log(err);
        }
        console.log('success');
      } )
      return dest_path;      
    }

  }


  inventory(length: number, items, template: string, curPage: number, pages: number){
    let type: any[14];
    let number: any[14];
    let user: any[14];
    let location: any[14];
    let comment: any[14];

    let done = false;
    let i = 0
    while(i < 14){
      const item = items[i];
      if (i < length){
        type[i] = item.type;
        number[i] = item.number;
        user[i] = item.user;
        location[i] = item.location;
        comment[i] = item.location;
      } else {
        type[i] = number[i] = user[i] = location[i] = comment[i] = "";
      }
      i++;
    }

    switch(template){
      case 'start': return this.fillInvStart(type, number, user, location, comment, curPage, pages);
      case 'extra': return this.fillInvExtra(type, number, user, location, comment, curPage, pages);
    }
  }

  fillInvStart(type, number, user, location, comment, curPage, pages){
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/inventory_template_base.html", 'utf8'));
    // Add variables to template
    return compiled({ type1: type[0], number1: number[0] , user1: user[0], location1: location[0], comment1: comment[0],
                      type2: type[1], number2: number[1] , user2: user[1], location2: location[1], comment2: comment[1],
                      type3: type[2], number3: number[2] , user3: user[2], location3: location[2], comment3: comment[2],
                      type4: type[3], number4: number[3] , user4: user[3], location4: location[3], comment4: comment[3],
                      type5: type[4], number5: number[4] , user5: user[4], location5: location[4], comment5: comment[4],
                      type6: type[5], number6: number[5] , user6: user[5], location6: location[5], comment6: comment[5],
                      type7: type[6], number7: number[6] , user7: user[6], location7: location[6], comment7: comment[6],
                      type8: type[7], number8: number[7] , user8: user[7], location8: location[7], comment8: comment[7],
                      type9: type[8], number9: number[8] , user9: user[8], location9: location[8], comment9: comment[8],
                      type10: type[9], number10: number[9] , user10: user[9], location10: location[9], comment10: comment[9],
                      type11: type[10], number11: number[10] , user11: user[10], location11: location[10], comment11: comment[10],
                      type12: type[11], number12: number[11] , user12: user[11], location12: location[11], comment12: comment[11],
                      type13: type[12], number13: number[12] , user13: user[12], location13: location[12], comment13: comment[12],
    
    });
  }

  fillInvExtra(type, number, user, location, comment, curPage, pages){
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/inventory_template_extra.html", 'utf8'));
    // Add variables to template
    return compiled({ type1: type[0], number1: number[0] , user1: user[0], location1: location[0], comment1: comment[0],
                      type2: type[1], number2: number[1] , user2: user[1], location2: location[1], comment2: comment[1],
                      type3: type[2], number3: number[2] , user3: user[2], location3: location[2], comment3: comment[2],
                      type4: type[3], number4: number[3] , user4: user[3], location4: location[3], comment4: comment[3],
                      type5: type[4], number5: number[4] , user5: user[4], location5: location[4], comment5: comment[4],
                      type6: type[5], number6: number[5] , user6: user[5], location6: location[5], comment6: comment[5],
                      type7: type[6], number7: number[6] , user7: user[6], location7: location[6], comment7: comment[6],
                      type8: type[7], number8: number[7] , user8: user[7], location8: location[7], comment8: comment[7],
                      type9: type[8], number9: number[8] , user9: user[8], location9: location[8], comment9: comment[8],
                      type10: type[9], number10: number[9] , user10: user[9], location10: location[9], comment10: comment[9],
                      type11: type[10], number11: number[10] , user11: user[10], location11: location[10], comment11: comment[10],
                      type12: type[11], number12: number[11] , user12: user[11], location12: location[11], comment12: comment[11],
                      type13: type[12], number13: number[12] , user13: user[12], location13: location[12], comment13: comment[12],
                      type14: type[13], number14: number[13] , user14: user[13], location14: location[13], comment14: comment[13],
    });
  }



}