import * as _ from 'lodash';

import { queries } from '../database-queries';
import { SqlUtilities } from '../utilities/sql-utilities';
import { CardDTO } from '../DTO/cardDTO';
import { UserDTO } from '../DTO/userDTO';
import { DocumentDTO } from '../DTO/documentDTO';
import { ReceiptDTO } from '../DTO/receiptDTO';
import { DeliveryDTO } from '../DTO/deliveryDTO';
import { LogEventDTO } from '../DTO/logEventDTO';
import { VerificationDTO } from '../DTO/verificationDTO';
import { CardTypeDTO } from '../DTO/cardTypeDTO';
import { DocumentTypeDTO } from '../DTO/documentTypeDTO';
import { UserType } from '../datamodels/userType';
import { UserTypeDTO } from '../DTO/userTypeDTO';
import { ItemTypeDTO } from '../DTO/itemTypeDTO';
import { LogTypeDTO } from '../DTO/logTypeDTO';
import { VerificationTypeDTO } from '../DTO/verificationTypeDTO';
import { StatusTypeDTO } from '../DTO/statusTypeDTO';

export function configGetRequests(appObject: any) {
  let app = appObject.app;
  let sqlUtil = appObject.sqlUtil;

  app.get('/getCards', (req, res) => {
    let query = queries.selectAllCards;

    let queryData = [];

    if (req.query.userID) {
      query += ' WHERE Card.UserID=?';
      queryData.push(req.query.userID);
    }

    sqlUtil.sqlSelectQuery(query, queryData).then((cardList: any[]) => {
      res.send(
        cardList.map(card => {
          return new CardDTO(card);
        })
      );
    });
  });

  app.get('/getCardTypes', (req, res) => {
    const query = queries.selectAllCardTypes;

    sqlUtil.sqlSelectQuery(query).then((cardTypeList: any[]) => {
      res.send(
        cardTypeList.map(cardType => {
          return new CardTypeDTO(cardType);
        })
      );
    });
  });

  app.get('/getDocuments', (req, res) => {
    let query = queries.selectAllDocuments;

    let queryData = [];

    if (req.query.userID) {
      query += ' WHERE Document.UserID=?';
      queryData.push(req.query.userID);
    }

    sqlUtil.sqlSelectQuery(query, queryData).then((documentList: any[]) => {
      res.send(
        documentList.map(document => {
          return new DocumentDTO(document);
        })
      );
    });
  });

  app.get('/getDeliveries', (req, res) => {
    const query = queries.selectAllDeliveries;

    sqlUtil.sqlSelectQuery(query).then((deliveryList: any[]) => {
      res.send(
        deliveryList.map(delivery => {
          return new DeliveryDTO(delivery);
        })
      );
    });
  });

  app.get('/getDocumentTypes', (req, res) => {
    const query = queries.selectAllDocumentTypes;

    sqlUtil.sqlSelectQuery(query).then((documentTypeList: any[]) => {
      res.send(
        documentTypeList.map(documentType => {
          return new DocumentTypeDTO(documentType);
        })
      );
    });
  });

  app.get('/getReceipts', (req, res) => {
    let query = queries.selectAllReceipts;

    let queryData = [];

    if (req.query.userID) {
      query += ' WHERE Receipt.UserID=?';
      queryData.push(req.query.userID);
    }

    sqlUtil.sqlSelectQuery(query, queryData).then((receiptList: any[]) => {
      res.send(
        receiptList.map(receipt => {
          receipt.host = 'http://' + req.headers.host;
          return new ReceiptDTO(receipt);
        })
      );
    });
  });

  app.get('/getLogEvents', (req, res) => {
    const query = queries.selectAllLogEvents;

    sqlUtil.sqlSelectQuery(query).then((logEventList: any[]) => {
      res.send(
        logEventList.map(logEvent => {
          return new LogEventDTO(logEvent);
        })
      );
    });
  });

  app.get('/getItemTypes', (req, res) => {
    sqlUtil.sqlSelectAll('ItemType').then((itemTypeList: any[]) => {
      res.send(
        itemTypeList.map(itemType => {
          return new ItemTypeDTO(itemType.ID, itemType.Name);
        })
      );
    });
  });

  app.get('/getUserTypes', (req, res) => {
    sqlUtil.sqlSelectAll('UserType').then((userTypeList: any[]) => {
      res.send(
        userTypeList.map(userType => {
          return new UserTypeDTO(userType);
        })
      );
    });
  });

  app.get('/getLogTypes', (req, res) => {
    sqlUtil.sqlSelectAll('LogType').then((logTypeList: any[]) => {
      res.send(
        logTypeList.map(logType => {
          return new LogTypeDTO(logType.ID, logType.Name, logType.LogText);
        })
      );
    });
  });

  app.get('/getVerifications', (req, res) => {
    let query = queries.selectAllVerifications;

    let queryData = [];

    if (req.query.userID) {
      query += ' WHERE Verification.UserID=?';
      queryData.push(req.query.userID);
    }

    sqlUtil.sqlSelectQuery(query, queryData).then((verificationList: any[]) => {
      res.send(
        verificationList.map(verification => {
          return new VerificationDTO(verification);
        })
      );
    });
  });

  app.get('/getVerificationTypes', (req, res) => {
    sqlUtil.sqlSelectAll('VerificationType').then((verificationTypeList: any[]) => {
      res.send(
        verificationTypeList.map(verificationType => {
          return new VerificationTypeDTO(verificationType.ID, verificationType.Name);
        })
      );
    });
  });

  app.get('/getUsers', (req, res) => {
    const query = queries.selectAllUsers;

    sqlUtil.sqlSelectQuery(query).then((userList: any[]) => {
      res.send(
        userList.map(user => {
          return new UserDTO(user);
        })
      );
    });
  });

  app.get('/getStatusTypes', (req, res) => {
    sqlUtil.sqlSelectAll('StatusType').then((statusTypeList: any[]) => {
      res.send(
        statusTypeList.map(statusType => {
          return new StatusTypeDTO(statusType.ID, statusType.Name);
        })
      );
    });
  });
}