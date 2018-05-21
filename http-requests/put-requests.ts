import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

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

export function configPutRequests(appObject: any) {
  let app = appObject.app;
  let sqlUtil = appObject.sqlUtil;

  app.put('/updateCard', (req, res) => {
    sqlUtil.sqlUpdate('Card', new Card(req.body.cardItem)).then(success => {
      if (success) {
        if (req.body.logEvent) {
          sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(id => {
            req.body.logEvent.id = Number(id);
            req.body.logEvent.logText = _.replace(
              req.body.logEvent.logType.logText,
              '$data',
              req.body.logEvent.logText
            );
            res.send({ message: 'success', data: req.body });
          });
        } else {
          res.send({ message: 'success', data: req.body });
        }
      } else res.send({ message: 'failure' });
    });
  });

  app.put('/updateCardType', (req, res) => {
    sqlUtil.sqlUpdate('CardType', new CardType(req.body)).then(success => {
      if (success) res.send({ message: 'success' });
      else res.send({ message: 'failure' });
    });
  });

  app.put('/updateDocument', (req, res) => {
    sqlUtil.sqlUpdate('Document', new Document(req.body.documentItem)).then(success => {
      if (success) {
        if (req.body.logEvent) {
          sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(id => {
            req.body.logEvent.id = Number(id);
            req.body.logEvent.logText = _.replace(
              req.body.logEvent.logType.logText,
              '$data',
              req.body.logEvent.logText
            );
            res.send({ message: 'success', data: req.body });
          });
        } else {
          res.send({ message: 'success', data: req.body });
        }
      } else res.send({ message: 'failure' });
    });
  });

  app.put('/updateDocumentType', (req, res) => {
    sqlUtil.sqlUpdate('DocumentType', new DocumentType(req.body)).then(success => {
      if (success) res.send({ message: 'success' });
      else res.send({ message: 'failure' });
    });
  });

  app.put('/updateReceipt', (req, res) => {
    sqlUtil.sqlUpdate('Receipt', new Receipt(req.body.receipt)).then(id => {
      let table;
      let item;
      if (req.body.card) {
        table = 'Card';
        item = new Card(req.body.card);
      } else {
        table = 'Document';
        item = new Document(req.body.document);
      }

      sqlUtil.sqlUpdate(table, item).then(success => {
        sqlUtil.sqlInsert('LogEvent', new LogEvent(req.body.logEvent)).then(() => {
          req.body.logEvent.id = Number(id);
          req.body.logEvent.logText = _.replace(
            req.body.logEvent.logType.logText,
            '$data',
            req.body.logEvent.logText
          );
          res.send({ message: 'success', data: req.body });
        });
      });
    });
  });

  app.put('/updateDelivery', (req, res) => {
    sqlUtil.sqlUpdate('Delivery', new Delivery(req.body)).then(success => {
      if (success) res.send({ message: 'success' });
      else res.send({ message: 'failure' });
    });
  });

  app.put('/updateVerification', (req, res) => {
    sqlUtil.sqlUpdate('Verification', new Verification(req.body)).then(success => {
      if (success) res.send({ message: 'success' });
      else res.send({ message: 'failure' });
    });
  });

  app.put('/updateUser', (req, res) => {
    if (req.body.password) {
      bcrypt.hash(atob(req.body.password), 12, (err, hash) => {
        req.body.password = hash;
        sqlUtil.sqlUpdate('User', new User(req.body)).then(success => {
          if (success) res.send({ message: 'success' });
          else res.send({ message: 'failure' });
        });
      });
    } else {
      sqlUtil.sqlUpdate('User', new User(req.body)).then(success => {
        if (success) res.send({ message: 'success' });
        else res.send({ message: 'failure' });
      });
    }
  });

  app.post('/login', (req, res) => {
    sqlUtil.sqlSelectUsername(req.body.username).then((user: any) => {
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