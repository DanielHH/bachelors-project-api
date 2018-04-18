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
  formatDate: any;

  constructor() {
    this.sqlUtil = new SqlUtilities();

    this.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD');
    };
  }

  generatePDF(data?: any[]) {
    // Read and compile variable html template
    const pdfType = data[0];
    switch (pdfType) {
      case 'card':
        return this.createCardReceipt(data[1], data[2], pdfType);
      case 'document':
        return this.createDocumentReceipt(data[1], data[2], pdfType);
      case 'inventory':
        return this.createInventory(data[1], data[2]);
      case 'receipts':
        return this.createReceiptList(data[1], data[2]);
      case 'documents':
        return this.createDocumentList(data[1], data[2]);
      case 'cards':
        return this.createCardList(data[1], data[2]);
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
      cardExpirationDate: moment(body.expirationDate).format('YYYY-MM-DD'),
      cardComment: body.comment,
      cardUser: body.user.name,
      adminUser: body.registrator
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
  createDocumentReceipt(body: DocumentDTO, receipt, pdfType) {
    const compiled = ejs.compile(
      fs.readFileSync(this.templatePath + '/document/document_receipt_template.html', 'utf8')
    );
    // Add variables to template
    const html = compiled({
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      documentType: body.documentType.name,
      documentNumber: body.documentNumber,
      documentName: body.name,
      documentLocation: body.location,
      documentComment: body.comment,
      documentUser: body.user.name,
      adminUser: body.registrator
    });
    return this.receiptPromise(html, receipt, pdfType, body);
  }

  /**
   * Generates a dynamically sized pdf
   * @param inventory a list of items to be verified
   * @returns a promise of a dynamically sized pdf
   */
  createInventory(inventory: VerificationDTO[], filters: any[]) {
    const compiled = ejs.compile(fs.readFileSync(this.templatePath + '/inventory/inventory_template.html', 'utf8'), {
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      items: inventory,
      filters: filters
    });

    return this.filePromise(compiled, '/inventory');
  }

  /**
   * Generates a dynamically sized pdf
   * @param cards a list of cards
   * @returns a promise of a dynamically sized pdf
   */
  createCardList(cards: CardDTO[], filters: any[]) {
    const compiled = ejs.render(fs.readFileSync(this.templatePath + '/card/card_list_template.html', 'utf8'), {
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      items: cards,
      filters: filters,
      formatDate: this.formatDate
    });

    return this.filePromise(compiled, '/cards');
  }

  /**
   * Generates a dynamically sized pdf
   * @param documents a list of documents
   * @returns a promise of a dynamically sized pdf
   */
  createDocumentList(documents: DocumentDTO[], filters: any[]) {
    const compiled = ejs.render(fs.readFileSync(this.templatePath + '/document/document_list_template.html', 'utf8'), {
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      items: documents,
      filters: filters
    });

    return this.filePromise(compiled, '/documents');
  }

  /**
   * Generates a dynamically sized pdf
   * @param receipts a list of receipts
   * @returns a promise of a dynamically sized pdf
   */
  createReceiptList(receipts: ReceiptDTO[], filters: any[]) {
    const compiled = ejs.render(fs.readFileSync(this.templatePath + '/receipt/receipt_list_template.html', 'utf8'), {
      currentDate: moment(new Date()).format('YYYY-MM-DD'),
      items: receipts,
      filters: filters,
      formatDate: this.formatDate
    });

    return this.filePromise(compiled, '/receipts');
  }

  /**
   * Ensures that a template is saved to disk
   * in a synchronous fashion.
   * @param html the template to be save
   * @param path the path to where the file is saved
   */
  filePromise(html, path) {
    var pdfFilePath =
      './pdfs' + path + '_' + moment(new Date()).format('YYYY-MM-DD') + '_' + this.getIdentifier() + '.pdf';
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
      '_' +
      this.getIdentifier() +
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
   * Generates a random number
   */
  getIdentifier() {
    return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  }
}
