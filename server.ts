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
    this.app.get('/', (req, res) => {
      this.c.query('SELECT * FROM TestTable', (err, rows) => {
        if (!err) res.send(new TestModel(rows[0].ID, rows[0].StringColumn));
      });
    });

    this.app.post('/testPost', (req, res) => {
      console.log(req.body);
      res.send({ message: 'success' });
    });

    this.app.post('/addNewCard', (req, res) => {

      var newCard = new Card(req.body);
      newCard.id = this.sqlUtil.sqlInsert('Card', newCard);
      
      res.send({ message: 'success', data: newCard });

    });
  }
}

export default new Server().app;
