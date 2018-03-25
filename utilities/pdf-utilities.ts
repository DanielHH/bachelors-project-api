import { SqlUtilities } from "./sql-utilities";
import { Card } from "../datamodels/card";
import { CardDTO } from "../DTO/cardDTO";
import { Document } from "../datamodels/document";



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
      case "inventory":
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

    // Send pdf as respons
    this.fs.readFile(pdfFilePath , (err,data) => {
      if (err) {
        console.log(err);
      } else{
        return data;
      }
    });
    return null;
  }


  getCardData(id: any){
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
  }

  createCardReceipt(id: any) {
    return this.fs.readFileSync(this.templatePath + "/card_receipt_template.html", 'utf8');
    const card = this.getCardData(id);
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/card_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({ serNumber : card.cardNumber , type: card.cardType, user: card.user,
                          expDate: card.expirationDate, comment: card.comment,
                          location: card.location, curDate: new Date() });
  }

  createDokReceipt(id: any) {
    return this.fs.readFileSync(this.templatePath + "/dok_receipt_template.html", 'utf8');
    const doc = new Document();
    var compiled = this.ejs.compile(this.fs.readFileSync(this.templatePath + "/dok_receipt_template.html", 'utf8'));
    // Add variables to template
    return compiled({ serNumber : doc.documentNumber , info : doc.name, type: doc.documentType, sender: doc.sender,
                          dokDate: doc.documentDate, arrDate: doc.registrationDate, receiver: doc.userID,
                          comment: doc.comment, location: doc.location, curDate: new Date() });
  }

}