import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as methodOverride from 'method-override'
import * as cors from 'cors';
import * as mariasql from 'mariasql';
import { dbconfig as dbconfig } from './database-config';

class Server {

  public app: express.Application;

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();
  }

  private config() {

    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cors());

    /*var c = new mariasql();
    c.connect({
      host: dbconfig.host,
      user: dbconfig.username,
      password: dbconfig.password,
      db: dbconfig.db
    });

    this.app.get('/', (req, res) => {
      c.query('SELECT * FROM Users', (err, rows) => {
        if (err)
          res.send(err);
        else
          res.send(rows);
      });
    });
    */

    this.app.get('/', (req, res) => {
      res.send("hej på dig");
    });

  }

}

export default new Server().app;
