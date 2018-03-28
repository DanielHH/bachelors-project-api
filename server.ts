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
import { Delivery } from './datamodels/delivery';
import { DocumentType } from './datamodels/documentType';
import { Receipt } from './datamodels/receipt';
import { ItemType } from './datamodels/itemType';
import { Verification } from './datamodels/verification';
import { VerificationType } from './datamodels/verificationType';
import { User } from './datamodels/user';
import { StatusType } from './datamodels/statusType';
import { PdfUtilities } from './utilities/pdf-utilities';
import { CardDTO } from './DTO/cardDTO';
import { UserDTO } from './DTO/userDTO';
import { DocumentDTO } from './DTO/documentDTO';
import { ReceiptDTO } from './DTO/receiptDTO';
import { DeliveryDTO } from './DTO/deliveryDTO';

class Server {
  public app: express.Application;


  sqlUtil: SqlUtilities;
  pdfUtil: PdfUtilities;

  constructor() {

    global.db = new mariasql();

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    this.sqlUtil = new SqlUtilities();

    this.httpRequests();
  }

  private config() {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cors());

    global.db.connect({
      host: dbconfig.host,
      user: dbconfig.username,
      password: dbconfig.password,
      db: dbconfig.db,
      charset: 'utf8'
    });
  }

  httpRequests() {
    this.app.get('/getCards', (req, res) => {

      const query = 'SELECT Card.*,' +
        'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
        'User.UserType, User.Username, User.Name, User.Email ' +
        'FROM Card LEFT JOIN (CardType, StatusType) ON (CardType.ID=Card.CardType AND StatusType.ID=Card.Status) LEFT JOIN (User) ON (User.ID=Card.UserID)';
      this.sqlUtil.sqlSelectQuery(query).then((cardList: any[]) => {
        res.send(
          cardList.map(card => {
            return new CardDTO(card);
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

      const query = 'SELECT Document.*,' +
        'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
        'User.UserType, User.Username, User.Name AS UsersName, User.Email ' +
        'FROM Document LEFT JOIN (DocumentType, StatusType) ON (DocumentType.ID=Document.DocumentType AND StatusType.ID=Document.Status) LEFT JOIN (User) ON (User.ID=Document.UserID)';

      this.sqlUtil.sqlSelectQuery(query).then((documentList: any[]) => {
        res.send(
          documentList.map(document => {
            return new DocumentDTO(document);
          })
        );
      });
    });


    this.app.get('/getDeliveries', (req, res) => {

      const query = 'SELECT Delivery.*,' +
      'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
      'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
      'FROM Delivery LEFT JOIN (DocumentType, StatusType) ON (DocumentType.ID=Delivery.DocumentType AND StatusType.ID=Delivery.Status)';


      this.sqlUtil.sqlSelectQuery(query).then((deliveryList: any[]) => {
        res.send(
          deliveryList.map(delivery => {
            return new DeliveryDTO(delivery);
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
            return new ReceiptDTO(receipt);
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
            return new UserDTO(user);
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

    this.app.get('/genPDF', (req, res) => {
      res.download("./pdfs/receipt.pdf");
    })

    this.app.post('/genPDF', function (req, res) {
      const pdfUtil = new PdfUtilities(/*this.sqlUtil*/);
      const data: string = pdfUtil.generatePDF(req.body);
      console.log(data);
      //res.contentType("application/pdf");
      res.download(data);
    });

    this.app.post('/testPost', (req, res) => {
      res.send({ message: 'success' });
    });

    this.app.post('/addNewCard', (req, res) => {
      this.sqlUtil.sqlInsert('Card', new Card(req.body)).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDocument', (req, res) => {
      this.sqlUtil.sqlInsert('Document', new Document(req.body)).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewReceipt', (req, res) => {
      this.sqlUtil.sqlInsert('Receipt', new Receipt(req.body)).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDelivery', (req, res) => {
      this.sqlUtil.sqlInsert('Delivery', new Delivery(req.body)).then(id => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.put('/updateCard', (req, res) => {
      this.sqlUtil.sqlUpdate('Card', new Card(req.body)).then(success => {
        if (success)
          res.send({ message: 'success' });
        else
          res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateDocument', (req, res) => {
      this.sqlUtil.sqlUpdate('Document', new Document(req.body)).then(success => {
        if (success)
          res.send({ message: 'success' });
        else
          res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateReceipt', (req, res) => {
      this.sqlUtil.sqlUpdate('Receipt', new Receipt(req.body)).then(success => {
        if (success)
          res.send({ message: 'success' });
        else
          res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateDelivery', (req, res) => {
      this.sqlUtil.sqlUpdate('Delivery', new Delivery(req.body)).then(success => {
        if (success)
          res.send({ message: 'success' });
        else
          res.send({ message: 'failure' });
      });
    });

  }

}

export default new Server().app;
