import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as mariasql from 'mariasql';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as atob from 'atob';
import * as btoa from 'btoa';

import { dbconfig } from './database-config';
import { TestModel } from './datamodels/testModel';
import { Card } from './datamodels/card';
import { SqlUtilities } from './utilities/sql-utilities';
import { CardType } from './datamodels/cardType';
import { Document } from './datamodels/document';
import { Delivery } from './datamodels/delivery';
import { DocumentType } from './datamodels/documentType';
import { Receipt } from './datamodels/receipt';
import { LogEvent } from './datamodels/logEvent';
import { LogType } from './datamodels/logType';
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
import { LogEventDTO } from './DTO/logEventDTO';
import { VerificationDTO } from './DTO/verificationDTO';
import { CardTypeDTO } from './DTO/cardTypeDTO';
import { DocumentTypeDTO } from './DTO/documentTypeDTO';
import { UserType } from './datamodels/userType';
import { UserTypeDTO } from './DTO/userTypeDTO';

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
    this.pdfUtil = new PdfUtilities();

    if (_.first(__dirname) == '/') {
      this.app.use('/pdfs', express.static(__dirname + '/pdfs'));
    } else {
      this.app.use('/pdfs', express.static(__dirname + '\\pdfs'));
    }

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
      const query =
        'SELECT Card.*,' +
        'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
        'CardType.CreationDate AS CardTypeCreationDate, CardType.ModifiedDate AS CardTypeModifiedDate,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
        'Verification.ID AS LastVerificationID,' +
        'Verification.VerificationDate AS LastVerificationDate,' +
        'User.UserType, User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
        'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate,' +
        'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
        'UserStatusType.ID AS UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
        'FROM Card LEFT JOIN (CardType, StatusType) ON (CardType.ID=Card.CardType AND StatusType.ID=Card.Status) ' +
        'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Card.UserID AND UserType.ID=User.UserType AND UserStatusType.ID=User.Status) ' +
        'LEFT JOIN (Verification) ON (Verification.ID=Card.LastVerification)';

      this.sqlUtil.sqlSelectQuery(query).then((cardList: any[]) => {
        res.send(
          cardList.map(card => {
            return new CardDTO(card);
          })
        );
      });
    });

    this.app.get('/getCardTypes', (req, res) => {
      const query =
        'SELECT CardType.*,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
        'FROM CardType LEFT JOIN (StatusType) ON (StatusType.ID=CardType.Status)';

      this.sqlUtil.sqlSelectQuery(query).then((cardTypeList: any[]) => {
        res.send(
          cardTypeList.map(cardType => {
            return new CardTypeDTO(cardType);
          })
        );
      });
    });

    this.app.get('/getDocuments', (req, res) => {
      const query =
        'SELECT Document.*,' +
        'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
        'DocumentType.CreationDate AS DocumentTypeCreationDate, DocumentType.ModifiedDate AS DocumentTypeModifiedDate,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName,' +
        'Verification.ID AS LastVerificationID,' +
        'Verification.VerificationDate AS LastVerificationDate,' +
        'User.UserType, User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
        'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate,' +
        'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
        'UserStatusType.ID AS UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
        'FROM Document LEFT JOIN (DocumentType, StatusType) ON (DocumentType.ID=Document.DocumentType AND StatusType.ID=Document.Status) ' +
        'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Document.UserID AND UserType.ID=User.UserType AND UserStatusType.ID=User.Status) ' +
        'LEFT JOIN (Verification) ON (Verification.ID=Document.LastVerification)';

      this.sqlUtil.sqlSelectQuery(query).then((documentList: any[]) => {
        res.send(
          documentList.map(document => {
            return new DocumentDTO(document);
          })
        );
      });
    });

    this.app.get('/getDeliveries', (req, res) => {
      const query =
        'SELECT Delivery.*,' +
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
      const query =
        'SELECT DocumentType.*,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName ' +
        'FROM DocumentType LEFT JOIN (StatusType) ON (StatusType.ID=DocumentType.Status)';

      this.sqlUtil.sqlSelectQuery(query).then((documentTypeList: any[]) => {
        res.send(
          documentTypeList.map(documentType => {
            return new DocumentTypeDTO(documentType);
          })
        );
      });
    });

    this.app.get('/getReceipts', (req, res) => {
      let query =
        'SELECT Receipt.*,' +
        'Card.CardType, Card.CardNumber, Card.Location AS CardLocation,' +
        'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
        'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
        'Card.Status AS CardStatus, Card.ActiveReceipt AS CardActiveReceipt,' +
        'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
        'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
        'Document.DocumentType, Document.DocumentNumber, Document.Name AS DocumentName,' +
        'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
        'Document.Comment AS DocumentComment, Document.DocumentDate,' +
        'Document.RegistrationDate AS DocumentRegistrationDate,' +
        'Document.CreationDate AS DocumentCreationDate,' +
        'Document.ModifiedDate AS DocumentModifiedDate,' +
        'Document.Status AS DocumentStatus, Document.ActiveReceipt AS DocumentActiveReceipt,' +
        'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
        'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
        'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
        'User.UserType, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
        'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
        'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
        'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
        'FROM Receipt LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=Receipt.CardID AND CardType.ID=Card.CardType AND CardStatusType.ID=Card.Status) ' +
        'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=Receipt.DocumentID AND DocumentType.ID=Document.DocumentType AND DocumentStatusType.ID=Document.Status) ' +
        'LEFT JOIN (ItemType) ON (ItemType.ID = Receipt.ItemTypeID) ' +
        'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Receipt.UserID AND UserType.ID=User.UserType AND UserStatusType.ID=User.Status)';

      let queryData = [];

      if (req.query.userID) {
        query += ' WHERE Receipt.UserID=?';
        queryData.push(req.query.userID);
      }

      this.sqlUtil.sqlSelectQuery(query, queryData).then((receiptList: any[]) => {
        res.send(
          receiptList.map(receipt => {
            receipt.host = 'http://' + req.headers.host;
            return new ReceiptDTO(receipt);
          })
        );
      });
    });

    this.app.get('/getLogEvents', (req, res) => {
      const query =
        'SELECT LogEvent.*,' +
        'Card.ID as CardID, Card.CardType, Card.CardNumber, Card.Location AS CardLocation,' +
        'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
        'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
        'Card.Status AS CardStatus, Card.ActiveReceipt AS CardActiveReceipt,' +
        'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
        'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
        'Document.DocumentType, Document.DocumentNumber, Document.Name AS DocumentName,' +
        'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
        'Document.Comment AS DocumentComment, Document.DocumentDate,' +
        'Document.RegistrationDate AS DocumentRegistrationDate,' +
        'Document.CreationDate AS DocumentCreationDate,' +
        'Document.ModifiedDate AS DocumentModifiedDate,' +
        'Document.Status AS DocumentStatus, Document.ActiveReceipt AS DocumentActiveReceipt,' +
        'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
        'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
        'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
        'User.UserType, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
        'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
        'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
        'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName, ' +
        'LogType.ID AS LogTypeID, LogType.Name AS LogTypeName, LogType.LogText AS LogTypeText ' +
        'FROM LogEvent LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=LogEvent.CardID AND CardType.ID=Card.CardType AND CardStatusType.ID=Card.Status) ' +
        'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=LogEvent.DocumentID AND DocumentType.ID=Document.DocumentType AND DocumentStatusType.ID=Document.Status) ' +
        'LEFT JOIN (ItemType) ON (ItemType.ID = LogEvent.ItemTypeID) ' +
        'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=LogEvent.UserID AND UserType.ID=User.UserType AND UserStatusType.ID=User.Status) ' +
        'LEFT JOIN (LogType) ON (LogType.ID = LogEvent.LogTypeID)';

      this.sqlUtil.sqlSelectQuery(query).then((logEventList: any[]) => {
        res.send(
          logEventList.map(logEvent => {
            return new LogEventDTO(logEvent);
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

    this.app.get('/getUserTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('UserType').then((userTypeList: any[]) => {
        res.send(
          userTypeList.map(userType => {
            return new UserTypeDTO(userType);
          })
        );
      });
    });

    this.app.get('/getLogTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('LogType').then((logTypeList: any[]) => {
        res.send(
          logTypeList.map(logType => {
            return new LogType(logType);
          })
        );
      });
    });

    this.app.get('/getVerifications', (req, res) => {
      const query =
        'SELECT Verification.*,' +
        'Card.CardType, Card.CardNumber, Card.Location AS CardLocation,' +
        'Card.Comment AS CardComment, Card.ExpirationDate AS CardExpirationDate,' +
        'Card.CreationDate AS CardCreationDate, Card.ModifiedDate AS CardModifiedDate,' +
        'Card.Status AS CardStatus, Card.ActiveReceipt AS CardActiveReceipt,' +
        'CardType.ID AS CardTypeID, CardType.Name AS CardTypeName,' +
        'CardStatusType.ID AS CardStatusTypeID, CardStatusType.Name AS CardStatusTypeName,' +
        'Document.DocumentType, Document.DocumentNumber, Document.Name AS DocumentName,' +
        'Document.Sender AS DocumentSender, Document.Location AS DocumentLocation,' +
        'Document.Comment AS DocumentComment, Document.DocumentDate,' +
        'Document.RegistrationDate AS DocumentRegistrationDate,' +
        'Document.CreationDate AS DocumentCreationDate,' +
        'Document.ModifiedDate AS DocumentModifiedDate,' +
        'Document.Status AS DocumentStatus, Document.ActiveReceipt AS DocumentActiveReceipt,' +
        'DocumentType.ID AS DocumentTypeID, DocumentType.Name AS DocumentTypeName,' +
        'DocumentStatusType.ID AS DocumentStatusTypeID, DocumentStatusType.Name AS DocumentStatusTypeName,' +
        'ItemType.ID AS ItemTypeID, ItemType.Name AS ItemTypeName,' +
        'User.UserType, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName, ' +
        'User.Username AS UserUsername, User.Name AS UserName, User.Email AS UserEmail,' +
        'User.CreationDate AS UserCreationDate, User.ModifiedDate AS UserModifiedDate, ' +
        'UserStatusType.ID as UserStatusTypeID, UserStatusType.Name AS UserStatusTypeName ' +
        'FROM Verification LEFT JOIN (Card, CardType, StatusType AS CardStatusType) ON (Card.ID=Verification.CardID AND CardType.ID=Card.CardType AND CardStatusType.ID=Card.Status) ' +
        'LEFT JOIN (Document, DocumentType, StatusType AS DocumentStatusType) ON (Document.ID=Verification.DocumentID AND DocumentType.ID=Document.DocumentType AND DocumentStatusType.ID=Document.Status) ' +
        'LEFT JOIN (ItemType) ON (ItemType.ID = Verification.ItemTypeID) ' +
        'LEFT JOIN (User, UserType, StatusType AS UserStatusType) ON (User.ID=Verification.UserID AND UserType.ID=User.UserType AND UserStatusType.ID=User.Status)';

      this.sqlUtil.sqlSelectQuery(query).then((verificationList: any[]) => {
        res.send(
          verificationList.map(verification => {
            return new VerificationDTO(verification);
          })
        );
      });
    });

    this.app.get('/getVerificationTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('VerificationType').then((verificationTypeList: any[]) => {
        res.send(
          verificationTypeList.map(verificationType => {
            return new VerificationType(verificationType);
          })
        );
      });
    });

    this.app.get('/getUsers', (req, res) => {
      const query =
        'SELECT User.*,' +
        'StatusType.ID AS StatusTypeID, StatusType.Name AS StatusTypeName, ' +
        'UserType.ID AS UserTypeID, UserType.Name AS UserTypeName ' +
        'FROM User LEFT JOIN (UserType, StatusType) ON (UserType.ID=User.UserType AND StatusType.ID=User.Status)';

      this.sqlUtil.sqlSelectQuery(query).then((userList: any[]) => {
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
      res.download('./pdfs/receipt.pdf');
    });

    this.app.post('/genPDF', (req, res) => {
      this.pdfUtil.generatePDF(req.body).then(path => {
        res.send({
          message: 'success',
          url: 'http://' + req.headers.host + path
        });
      });
    });

    this.app.post('/testPost', (req, res) => {
      res.send({ message: 'success' });
    });

    this.app.post('/addNewCard', (req, res) => {
      this.sqlUtil.sqlInsert('Card', new Card(req.body.card)).then(id => {
        req.body.card.id = Number(id);
        req.body.logEvent.card.id = req.body.card.id;

        this.sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then((logID) => {
          req.body.logEvent.id = Number(logID);
          req.body.logEvent.logText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);
        
          res.send({ message: 'success', data: req.body });
        });
      });
    });

    this.app.post('/addNewCardType', (req, res) => {
      this.sqlUtil.sqlInsert('CardType', new CardType(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDocument', (req, res) => {
      this.sqlUtil.sqlInsert('Document', new Document(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDocumentType', (req, res) => {
      this.sqlUtil.sqlInsert('DocumentType', new DocumentType(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewReceipt', (req, res) => {
      this.sqlUtil.sqlInsert('Receipt', new Receipt(req.body.receipt)).then(id => {
        let table;
        let item;
        if (req.body.card) {
          table = 'Card';
          item = new Card(req.body.card);
          req.body.card.activeReceipt = Number(id);
        } else {
          table = 'Document';
          item = new Document(req.body.document);
          req.body.document.activeReceipt = Number(id);
        }
        req.body.receipt.id = Number(id);
        item.activeReceipt = Number(id);

        this.sqlUtil.sqlUpdate(table, item).then(success => {
          this.sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(() => {
            req.body.logEvent.id = Number(id);
            req.body.logEvent.LogText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);
            res.send({ message: 'success', data: req.body });
          });
        });
      });
    });

    this.app.post('/addNewLogEvent', (req, res) => {
      this.sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewDelivery', (req, res) => {
      this.sqlUtil.sqlInsert('Delivery', new Delivery(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewVerification', (req, res) => {
      this.sqlUtil.sqlInsert('Verification', new Verification(req.body)).then(id => {
        req.body.id = Number(id);
        res.send({ message: 'success', data: req.body });
      });
    });

    this.app.post('/addNewUser', (req, res) => {

      bcrypt.hash(atob(req.body.password), 12, (err, hash) => {
        req.body.password = hash;
        this.sqlUtil.sqlInsert('User', new User(req.body)).then(id => {
          req.body.id = Number(id);
          res.send({ message: 'success', data: req.body });
        });
      });
    });

    this.app.put('/updateCard', (req, res) => {
      this.sqlUtil.sqlUpdate('Card', new Card(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateCardType', (req, res) => {
      this.sqlUtil.sqlUpdate('CardType', new CardType(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateDocument', (req, res) => {
      this.sqlUtil.sqlUpdate('Document', new Document(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateDocumentType', (req, res) => {
      this.sqlUtil.sqlUpdate('DocumentType', new DocumentType(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateReceipt', (req, res) => {
      this.sqlUtil.sqlUpdate('Receipt', new Receipt(req.body)).then(id => {
        let table;
        let item;
        if (req.body.card) {
          table = 'Card';
          item = new Card(req.body.card);
        } else {
          table = 'Document';
          item = new Document(req.body.document);
        }

        this.sqlUtil.sqlUpdate(table, item).then(success => {
          this.sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(() => {
            req.body.logEvent.id = Number(id);
            req.body.logEvent.LogText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);
            res.send({ message: 'success', data: req.body });
        });      
      });
    });
  });

    this.app.put('/updateDelivery', (req, res) => {
      this.sqlUtil.sqlUpdate('Delivery', new Delivery(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateVerification', (req, res) => {
      this.sqlUtil.sqlUpdate('Verification', new Verification(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    this.app.put('/updateUser', (req, res) => {
      this.sqlUtil.sqlUpdate('User', new User(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    });

    /*
    this.app.get('/updatePassword', (req, res) => {
      this.sqlUtil.sqlSelectID('User', 8).then((user: any) => {
        bcrypt.hash(user.Password, 12, (err, hash) => {
          user.Password = hash;
          this.sqlUtil.sqlUpdate('User', user);
          res.send('done');
        });
      });
    });*/

    this.app.post('/login', (req, res) => {
      this.sqlUtil.sqlSelectUsername(req.body.username).then((user: any) => {
        if (user) {
          bcrypt.compare(atob(req.body.password), user.Password, (err, result) => {
            if (result) {
              res.send({ message: 'success', data: new UserDTO(user) });
            } else {
              res.send({ message: 'failure' });
            }
          });
        } else {
          res.send({ message: 'failure' });
        }
      });
    });
  }
}

export default new Server().app;
