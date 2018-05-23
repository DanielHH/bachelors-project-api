import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

import * as atob from 'atob';
import * as btoa from 'btoa';

import { Card } from '../datamodels/card';
import { LogEvent } from '../datamodels/logEvent';
import { User } from '../datamodels/user';
import { Verification } from '../datamodels/verification';
import { Delivery } from '../datamodels/delivery';
import { Document } from '../datamodels/document';
import { CardType } from '../datamodels/cardType';
import { Receipt } from '../datamodels/receipt';
import { DocumentType } from '../datamodels/documentType';
import { UserDTO } from '../DTO/userDTO';

export function configPostRequests(appObject: any) {
  let app = appObject.app;
  let sqlUtil = appObject.sqlUtil;
  let pdfUtil = appObject.pdfUtil;

  app.post('/genPDF', (req, res) => {
    pdfUtil.generatePDF(req.body).then(path => {
      res.send({
        message: 'success',
        url: 'http://' + req.headers.host + path
      });
    });
  });

  app.post('/addNewCard', (req, res) => {
    sqlUtil.sqlInsert('Card', new Card(req.body.card)).then(id => {
      req.body.card.id = Number(id);
      req.body.logEvent.card.id = req.body.card.id;

      sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(logID => {
        req.body.logEvent.id = Number(logID);
        req.body.logEvent.logText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);

        res.send({ message: 'success', data: req.body });
      });
    });
  });

  app.post('/addNewCardType', (req, res) => {
    sqlUtil.sqlInsert('CardType', new CardType(req.body)).then(id => {
      req.body.id = Number(id);
      res.send({ message: 'success', data: req.body });
    });
  });

  app.post('/addNewDocument', (req, res) => {
    sqlUtil.sqlInsert('Document', new Document(req.body.document)).then(id => {
      req.body.document.id = Number(id);
      req.body.logEvent.document.id = req.body.document.id;

      sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(logID => {
        req.body.logEvent.id = Number(logID);
        req.body.logEvent.logText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);

        res.send({ message: 'success', data: req.body });
      });
    });
  });

  app.post('/addNewDocumentType', (req, res) => {
    sqlUtil.sqlInsert('DocumentType', new DocumentType(req.body)).then(id => {
      req.body.id = Number(id);
      res.send({ message: 'success', data: req.body });
    });
  });

  app.post('/addNewReceipt', (req, res) => {
    sqlUtil.sqlInsert('Receipt', new Receipt(req.body.receipt)).then(id => {
      let table;
      let item;

      if (req.body.receipt.card) {
        table = 'Card';
        req.body.receipt.card.activeReceiptID = Number(id);
        item = new Card(req.body.receipt.card);
      } else {
        table = 'Document';
        req.body.receipt.document.activeReceiptID = Number(id);
        item = new Document(req.body.receipt.document);
      }

      req.body.receipt.id = Number(id);

      sqlUtil.sqlUpdate(table, item).then(success => {
        sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(() => {
          req.body.logEvent.id = Number(id);
          req.body.logEvent.logText = _.replace(req.body.logEvent.logType.logText, '$data', req.body.logEvent.logText);
          res.send({ message: 'success', data: req.body });
        });
      });
    });
  });

  app.post('/addNewLogEvent', (req, res) => {
    sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body)).then(id => {
      req.body.id = Number(id);
      res.send({ message: 'success', data: req.body });
    });
  });

  app.post('/addNewDelivery', (req, res) => {
    sqlUtil.sqlInsert('Delivery', new Delivery(req.body)).then(id => {
      req.body.id = Number(id);
      res.send({ message: 'success', data: req.body });
    });
  });

  app.post('/addNewVerification', (req, res) => {
    sqlUtil.sqlInsert('Verification', new Verification(req.body)).then(id => {
      req.body.id = Number(id);
      res.send({ message: 'success', data: req.body });
    });
  });

  app.post('/addNewUser', (req, res) => {
    bcrypt.hash(atob(req.body.password), 12, (err, hash) => {
      req.body.password = hash;
      sqlUtil.sqlInsert('User', new User(req.body)).then(id => {
        req.body.id = Number(id);
        req.body.password = '';
        res.send({ message: 'success', data: req.body });
      });
    });
  });

  app.post('/login', (req, res) => {
    sqlUtil.sqlSelectUsername(req.body.username).then((user: any) => {
      if (user && user.StatusTypeID != 6) {
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
