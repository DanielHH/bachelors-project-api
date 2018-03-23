import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as mariasql from 'mariasql';

import { dbconfig } from './database-config';
import { TestModel } from './datamodels/testModel';
import { Card } from './datamodels/card';
import { SqlUtilities } from './utilities/sql-utilities';
import { CardType } from './datamodels/cardType';
import { Document } from './datamodels/document';
import { DocumentType } from './datamodels/documentType';
import { Receipt } from './datamodels/receipt';
import { ItemType } from './datamodels/itemType';
import { Verification } from './datamodels/verification';
import { VerificationType } from './datamodels/verificationType';
import { User } from './datamodels/user';
import { StatusType } from './datamodels/statusType';
import { PdfUtilities } from './utilities/pdf-utilities';

class Server {
  public app: express.Application;

  c = new mariasql();

  sqlUtil: SqlUtilities;
  pdfUtil: PdfUtilities;

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    this.sqlUtil = new SqlUtilities(this.c);
    this.pdfUtil = new PdfUtilities();

    this.httpRequests();
  }

  private config() {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cors());

    this.c.connect({
      host: dbconfig.host,
      user: dbconfig.username,
      password: dbconfig.password,
      db: dbconfig.db,
      charset: 'utf8'
    });
  }

  httpRequests() {
    this.app.get('/getCards', (req, res) => {
      this.sqlUtil.sqlSelectAll('Card').then((cardList: any[]) => {
        res.send(
          cardList.map(card => {
            return new Card(card);
          })
        );
      });
    });

    this.app.get('/getCardTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('CardType').then((cardTypeList: any[]) => {
        res.send(
          cardTypeList.map(cardType => {
            return new CardType(cardType);
          })
        );
      });
    });

    this.app.get('/getDocuments', (req, res) => {
      this.sqlUtil.sqlSelectAll('Document').then((documentList: any[]) => {
        res.send(
          documentList.map(document => {
            return new Document(document);
          })
        );
      });
    });

    this.app.get('/getDocumentTypes', (req, res) => {
      this.sqlUtil
        .sqlSelectAll('DocumentType')
        .then((documentTypeList: any[]) => {
          res.send(
            documentTypeList.map(documentType => {
              return new DocumentType(documentType);
            })
          );
        });
    });

    this.app.get('/getReceipts', (req, res) => {
      this.sqlUtil.sqlSelectAll('Receipt').then((receiptList: any[]) => {
        res.send(
          receiptList.map(receipt => {
            return new Receipt(receipt);
          })
        );
      });
    });

    this.app.get('/getItemTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('ItemType').then((itemTypeList: any[]) => {
        res.send(
          itemTypeList.map(itemType => {
            return new ItemType(itemType);
          })
        );
      });
    });

    this.app.get('/getVerifications', (req, res) => {
      this.sqlUtil
        .sqlSelectAll('Verification')
        .then((verificationList: any[]) => {
          res.send(
            verificationList.map(verification => {
              return new Verification(verification);
            })
          );
        });
    });

    this.app.get('/getVerificationTypes', (req, res) => {
      this.sqlUtil
        .sqlSelectAll('VerificationType')
        .then((verificationTypeList: any[]) => {
          res.send(
            verificationTypeList.map(verificationType => {
              return new VerificationType(verificationType);
            })
          );
        });
    });

    this.app.get('/getUsers', (req, res) => {
      this.sqlUtil.sqlSelectAll('User').then((userList: any[]) => {
        res.send(
          userList.map(user => {
            return new User(user);
          })
        );
      });
    });

    this.app.get('/getStatusTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('StatusType').then((statusTypeList: any[]) => {
        res.send(
          statusTypeList.map(statusType => {
            return new StatusType(statusType);
          })
        );
      });
    });

    this.app.post('/genPDF', function (req, res) {
      const templatePath = './pdfTemplates/';
      const params = req.body;
      console.log(req.body);
      // Get packages
      var fs = require('fs');
      var ejs = require('ejs');
      var pdf = require('html-pdf')
      let template = " ";
      // Read and compile variable html template
      switch (params[0]) {
        case "receipt": 
        default: template = "/receipt_template.html"; break;
      }


      var html = fs.readFileSync(templatePath + template, 'utf8');
      //var compiled = ejs.compile(fs.readFileSync(templatePath + '/receipt_template.html', 'utf8'));
      // Add variables to template
      //var html = compiled({ heading : params[0], paragraph : params[1]});
      //var html = compiled({ title : 'EJS', text : 'Hello, World!', text2 : 'Test me' });
      //var html = compiled({ title : 'EJS', text : 'Hello, World!', text2 : 'Follow me' });

      // Create and save pdf
      var pdfFilePath = './pdfs/receipt.pdf';
      var options = { format: 'A4' };
      var test = pdf.create(html, options).toFile(pdfFilePath, function(err, res2) {
        if (err) return console.log(err);
        console.log(res2);
      });
      //console.log(test);
      
      //res.send(req.body);
      // Send pdf as respons
      //console.log(fs.readFileSync(pdfFilePath));
      fs.readFile(pdfFilePath , (err,data) => {
        if (err) {
          console.log(err);
        } else{
          res.contentType("application/pdf");
          //console.log("Read file");
          //console.log(data);
          res.send(data);
        }
      });
    });

    this.app.post('/testPost', (req, res) => {
      res.send({ message: 'success' });
    });

    this.app.post('/addNewCard', (req, res) => {
      this.sqlUtil.sqlInsert('Card', req.body).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDocument', (req, res) => {
      this.sqlUtil.sqlInsert('Document', req.body).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.put('/updateCard', (req, res) => {
      this.sqlUtil.sqlUpdate('Card', req.body).then(success => {
        if(success)
          res.send({ message: 'success'});
        else
          res.send({ message: 'failure'});        
      });
    });

    this.app.put('/updateDocument', (req, res) => {
      this.sqlUtil.sqlUpdate('Document', req.body).then(success => {
        if(success)
          res.send({ message: 'success'});
        else
          res.send({ message: 'failure'});        
      });
    });
  }

}

export default new Server().app;
