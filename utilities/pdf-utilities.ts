import { SqlUtilities } from './sql-utilities';
import { Card } from '../datamodels/card';
import { CardDTO } from '../DTO/cardDTO';
import { Document } from '../datamodels/document';
import * as _ from 'lodash';
import { userInfo } from 'os';
import * as moment from 'moment';
import { DocumentDTO } from '../DTO/documentDTO';
import { VerificationDTO } from '../DTO/verificationDTO';
import { Receipt } from '../datamodels/receipt';
import { resolve } from 'path';
import { start } from 'repl';
import { ReceiptDTO } from '../DTO/receiptDTO';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';

export class PdfUtilities {
  templatePath = './pdfTemplates/';
  sqlUtil: SqlUtilities;
  merge = require('easy-pdf-merge');
  options: pdf.CreateOptions = { format: 'A4', type: 'pdf', base: 'file:///' + _.replace(__dirname, /\\/g, '/') };

  constructor() {
    this.sqlUtil = new SqlUtilities();
  }

  generatePDF(data?: any[]) {
    // Read and compile variable html template
    const pdfType = data[0];
    switch (pdfType) {
      case "card": return this.createCardReceipt(data[1], data[2], pdfType);
      case "document": return this.createDokReceipt(data[1], data[2], pdfType);
      case "inventory": return this.createInventory(data[1], data[2]);      
      case "receipts": return this.createReceiptList(data[1], data[2]);
      case "documents": return this.createDokList(data[1], data[2]);
      case "cards": return this.createCardList(data[1], data[2]);
    }
  }

  /**
   * Compiles and creates a template for a card receipt.
   * @param body Card to be turned into receipt
   * @param receipt The receipt which shall be updated
   * @param pdfType The type of pdf that shall be returned
   * @returns A promise that the receipt has been created and updated
   */
  createCardReceipt(body: CardDTO, receipt, pdfType) {
    const compiled = ejs.compile(fs.readFileSync(this.templatePath + '/card/card_receipt_template.html', 'utf8'));
    // Add variables to template
    const html = compiled({
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      cardType: body.cardType.name,
      cardNumber: body.cardNumber,
      cardLocation: body.location,
      cardExpirationDate: body.expirationDate,
      cardComment: body.comment,
      cardUser: body.user.name,
      adminUser: body.registrator,
    });

    return this.receiptPromise(html, receipt, pdfType, body);
  }

  /**
   * Compiles and creates a template for a document receipt.
   * @param body Document to be turned into receipt
   * @param receipt The receipt which shall be updated
   * @param pdfType The type of pdf that shall be returned
   * @returns A promise that the receipt has been created and updated
   */
  createDokReceipt(body: DocumentDTO, receipt, pdfType) {
    const compiled = ejs.compile(
      fs.readFileSync(this.templatePath + '/document/document_receipt_template.html', 'utf8')
    );
    // Add variables to template
    const html = compiled({
      serNumber: body.documentNumber,
      info: body.name,
      type: body.documentType.name,
      sender: body.sender,
      dokDate: moment(body.documentDate).format('YYYY-MM-DD'),
      arrDate: moment(body.registrationDate).format('YYYY-MM-DD'),
      receiver: body.user.name,
      comment: body.comment,
      location: body.location,
      curDate: moment(body.modifiedDate).format('YYYY-MM-DD')
    });
    return this.receiptPromise(html, receipt, pdfType, body);
  }

  /**
   * Generates a dynamically sized pdf
   * @param inventory a list of items to be verified
   * @returns a promise of a dynamically sized pdf
   */
  createInventory(inventory: VerificationDTO[], filters:any[]) {
    return this.generatePages(this.inventory, inventory, '/inventory', filters);
  }

  /**
   * Generates a dynamically sized pdf
   * @param receipts a list of receipts
   * @returns a promise of a dynamically sized pdf
   */
  createReceiptList(receipts: ReceiptDTO[], filters:any[]){
    return this.generatePages(this.receipts, receipts, '/receipts', filters);
  }

  /**
   * Generates a dynamically sized pdf
   * @param documents a list of documents
   * @returns a promise of a dynamically sized pdf
   */
  createDokList(documents: DocumentDTO[], filters:any[]){
    return this.generatePages(this.documents, documents, '/documents', filters);
  }

  /**
   * Generates a dynamically sized pdf
   * @param cards a list of cards
   * @returns a promise of a dynamically sized pdf
   */
  createCardList(cards: CardDTO[], filters:any[]){
    return this.generatePages(this.cards, cards, '/cards', filters);
  }

  /**
   * Extracts relevant information from a number of cards
   * and compiles them into a pdf template
   * @param length The number of items to extract from
   * @param cards The list of cards to extract from
   * @param template The type of template to be used
   * @param curPage The current working page
   * @param pages The total number of pages
   */
  cards(length, cards: CardDTO[], template, curPage, pages, filters:any[]){
    let items = [];
    let status, type, number, user, endDate, sender, comment, location;

    let done = false;
    let i = 0;
    for (let i = 0; i < length; i++) {
      const card = cards[i];
      type = card.cardType.name;
      status = card.status.name;
      number = card.cardNumber;
      comment = card.comment;
      location = card.location;
      endDate = moment(card.expirationDate).format('YYYY-MM-DD');

      if (card.user) {
        user = card.user.name;
      }
      items.push([status, number, type, user, location, comment, endDate]);
    }

    return PdfUtilities.fillTemplate(items, curPage, pages, '/card/card_template_' + template + '.html');
  }

  /**
   * Extracts relevant information from a number of documents
   * and compiles them into a pdf template
   * @param length The number of items to extract from
   * @param documents The list of documents to extract from
   * @param template The type of template to be used
   * @param curPage The current working page
   * @param pages The total number of pages
   */
  documents(length, documents: DocumentDTO[], template, curPage, pages, filters:any[]) {
    let items = [];
    let status, type, number, user, desc, sender, comment, location;

    let done = false;
    let i = 0;
    while (i < length) {
      const document = documents[i];
      type = document.documentType.name;
      status = document.status.name;
      number = document.documentNumber;
      desc = document.name;
      sender = document.sender;
      comment = document.comment;
      location = document.location;

      if (document.user) {
        user = document.user.name;
      }
      i++;
      items.push([status, number, desc, type, sender, comment, location]);
    }

    return PdfUtilities.fillTemplate(items, curPage, pages, '/document/document_template_' + template + '.html');
  }

  /**
   * Extracts relevant information from a number of receipts
   * and compiles them into a pdf template
   * @param length The number of items to extract from
   * @param receipts The list of receipts to extract from
   * @param template The type of template to be used
   * @param curPage The current working page
   * @param pages The total number of pages
   */
  receipts(length, receipts: ReceiptDTO[], template, curPage, pages, filters:any[]) {
    let items = [];
    let status, type, number, user, startDate, endDate;

    let done = false;
    let i = 0;
    while (i < length) {
      type = number = user = startDate = endDate = '';
      const receipt = receipts[i];

      status = receipt.endDate ? 'Inaktiv' : 'Aktiv';
      type = receipt.itemType.name === 'Card' ? 'Kort' : 'Handling';
      number = receipt.itemType.name == 'Card' ? receipt.card.cardNumber : receipt.document.documentNumber;
      user = receipt.user ? receipt.user.name : '-';
      startDate = receipt.startDate ? moment(receipt.startDate).format('YYYY-MM-DD') : '-';
      endDate = receipt.endDate ? moment(receipt.endDate).format('YYYY-MM-DD') : '-';

      i++;
      items.push([status, type, number, user, startDate, endDate]);
    }
    return PdfUtilities.fillTemplate(items, curPage, pages, '/receipt/receipt_template_' + template + '.html');
  }

  /**
   * Extracts relevant information from a number of inventory items
   * and compiles them into a pdf template
   * @param length The number of items to extract from
   * @param verifications The list of verifications to extract from
   * @param template The type of template to be used
   * @param curPage The current working page
   * @param pages The total number of pages
   */
  inventory(length: number, verifications: VerificationDTO[], template: string, curPage: number, pages: number, filters:any[]) {
    let items = [];
    let date, type, number, user, location, comment;

    let done = false;
    let i = 0;
    while (i < length) {
      if (i < length) {
        const verification = verifications[i];
        // console.log(verification);

        date = verification.verificationDate ? moment(verification.verificationDate).format('YYYY-MM-DD') : '-';
        user = verification.user.id ? verification.user.name : '-';
        // type = verification.itemType.name;
        switch (verification.itemType.name) {
          case 'Card':
            type = 'Kort';
            number = verification.card.cardNumber;
            location = verification.card.location;
            comment = verification.card.comment;
            break;

          case 'Document':
            type = 'Handling';
            number = verification.document.documentNumber;
            location = verification.document.location;
            comment = verification.document.comment;
            break;
          default:
            type = number = user = location = comment = '';
        }
      }
      i++;
      items.push(['', type, number, user, location, comment, date])
    }
    return PdfUtilities.fillTemplate(items, curPage, pages, '/inventory/inventory_template_' + template + '.html', filters);
  }

  /**
   * Iterates over the list and generates pages of appropriate length
   * @param dataFiller A function that extracts data from a list and returns a template
   * @param itemList A list of items to be turned into filled templates
   * @param path The path where the template is to be saved
   */
  generatePages(dataFiller: Function, itemList: any[], path, filters:any[]){
    let items = itemList.length;
    const itemsThatFit = 13;
    const pages = Math.ceil((items - itemsThatFit) / (itemsThatFit+3))+1;
    const pdfFilePath = './pdfs' + path;
    return this.filePromise(dataFiller(items, itemList, 'base', 1 , pages, filters), path);
  }

  /**
   * Fills a template with the parameters
   * @param items A list of items to be input into the template
   * @param curPage The current page of the template
   * @param pages The total number of pages of the template
   * @param template The kind of template to use
   */
  static fillTemplate(items, curPage, pages, template, filters=[]){
    console.log(filters);
    const filt = filters.filter(filt => {
      // console.log(filt);
      if (filt[1]) return filt;
    });
    console.log(filt);
    const templatePath = './pdfTemplates/';
    var compiled = ejs.compile(fs.readFileSync(templatePath + template, 'utf8'));
    return compiled({items: items, pages: pages, curDate: moment(new Date()).format('YYYY-MM-DD'), filters: filt});
  }

  /**
   * Ensures that a template is saved to disk
   * in a synchronous fashion.
   * @param html the template to be save
   * @param path the path to where the file is saved
   */
  filePromise(html, path) {
    var pdfFilePath = './pdfs' + path + '_' + moment(new Date()).format('YYYY-MM-DD') + '.pdf';
    return new Promise((resolve, reject) => {
      pdf.create(html, this.options).toFile(pdfFilePath, (err, res) => {
        if (!err) {
          resolve(pdfFilePath.substring(1));
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Ensures that the template is saved and the receipt is updated
   * synchronously
   * @param html The template to save to disk
   * @param receipt The receipt that shall be updated
   * @param pdfType The type of pdf receipt
   * @param object The object that is saved as a receipt
   */
  receiptPromise(html, receipt, pdfType, object) {
    const pdfFileName =
      pdfType +
      '_' +
      _.replace(object.user.name, /[/\s\\?%*:|"<>]/g, '') +
      '_' +
      moment(object.modifiedDate).format('YYYY-MM-DD') +
      '.pdf';
    const pdfFilePath = './pdfs/' + pdfFileName;
    return new Promise((resolve, reject) => {
      pdf.create(html, this.options).toFile(pdfFilePath, (err, res) => {
        if (!err) {
          receipt.url = pdfFileName;
          this.sqlUtil.sqlUpdate('Receipt', new Receipt(receipt)).then(success => {
            if (success) {
              resolve(pdfFilePath.substring(1));
            } else {
              reject(success);
            }
          });
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * Ensueres that the templates saves, are merged and are deleted synchronously
   * @param pdfFilePath the path where the template is to be saved
   * @param extraPages the secondary pages of the template
   * @param startPage the main page of the template
   * @deprecated Since we no longer need to merge multiple files
   */
  pdfPagesSync(pdfFilePath, extraPages, startPage) {
    const fileNames = [];
    let currentPath: string;

    // Creates and Saves the main page of the template to disk
    return new Promise((resolve, reject) => {
      pdf.create(startPage, this.options).toFile(pdfFilePath + '_start.pdf', function(err, res) {
        if (err) reject(err);
        else {
          fileNames.push(pdfFilePath + '_start.pdf');
          resolve();
        }
      });
    })
      .then(() => {
        // Creates and Saves the secondary pages of the template to disk
        return new Promise((resolve, reject) => {
          for (let i = 0; i < extraPages.length; i++) {
            currentPath = pdfFilePath + '_' + i + '_extra.pdf';
            fileNames.push(currentPath);
            pdf.create(extraPages[i], this.options).toFile(currentPath, (err, res) => {
              if (!err) {
                if (i == extraPages.length - 1) {
                  resolve();
                }
              } else {
                reject(err);
              }
            });
          }
        });
      })
      .then(() => {
        // Merge the template pages
        return new Promise((resolve, reject) => {
          const dest_path = pdfFilePath + '_' + moment(new Date()).format('YYYY-MM-DD') + '.pdf';
          var merge = require('easy-pdf-merge');
          merge(fileNames, dest_path, function(err) {
            if (!err) {
              resolve(dest_path.substring(1));
            } else {
              reject(err);
            }
          });
        });
      })
      .then(result => {
        // Delete the now irrelevant files
        return new Promise((resolve, reject) => {
          for (let i = 0; i < fileNames.length; i++) {
            fs.unlink(fileNames[i], err => {
              if (!err) {
                if (i == fileNames.length - 1) {
                  resolve(result);
                }
              } else {
                reject(err);
              }
            });
          }
        });
      });
  }
}
