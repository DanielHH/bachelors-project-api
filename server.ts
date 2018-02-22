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

class Server {
  public app: express.Application;
  
  c = new mariasql();

  sqlUtil: SqlUtilities;

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    this.sqlUtil = new SqlUtilities(this.c);

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
        res.send(cardList.map(card => {
          return new Card(card);
        }));
      });
    });
    
    this.app.get('/getCardTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('CardType').then((cardTypeList: any[]) => {
        res.send(cardTypeList.map(cardType => {
          return new CardType(cardType);
        }));
      });
    });

    this.app.get('/getDocuments', (req, res) => {
      this.sqlUtil.sqlSelectAll('Document').then((documentList: any[]) => {
        res.send(documentList.map(document => {
          return new Document(document);
        }));
      });
    });

    this.app.get('/getDocumentTypes', (req, res) => {
      this.sqlUtil.sqlSelectAll('DocumentType').then((documentTypeList: any[]) => {
        res.send(documentTypeList.map(documentType => {
          return new DocumentType(documentType);
        }));
      });
    });

    this.app.post('/testPost', (req, res) => {
      console.log(req.body);
      res.send({ message: 'success' });
    });

    this.app.post('/addNewCard', (req, res) => {

      this.sqlUtil.sqlInsert('Card', req.body).then((id) => {
        req.body.id = id;
        res.send({ message: 'success', data: req.body });        
      });
    });
  }
}

export default new Server().app;
