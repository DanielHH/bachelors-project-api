import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as methodOverride from "method-override";
import * as cors from "cors";
import * as mariasql from "mariasql";
import { dbconfig } from "./database-config";
import { TestModel } from "./datamodels/testModel";
import { Card } from "./datamodels/card";

class Server {
  public app: express.Application;

  c = new mariasql();

  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();
  }

  private config() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cors());

    this.c.connect({
      host: dbconfig.host,
      user: dbconfig.username,
      password: dbconfig.password,
      db: dbconfig.db,
      charset: "utf8"
    });

    this.app.get("/", (req, res) => {
      this.c.query("SELECT * FROM TestTable", (err, rows) => {
        if (!err)
          res.send(new TestModel(rows[0].ID, rows[0].StringColumn));
      });
    });

    this.app.post("/testPost", (req, res) => {

      console.log(req.body);
      res.send({ message: "success" });

    });

    this.app.post("/addNewCard", (req, res) => {

      var newCard = new Card();
      newCard = req.body;

      this.sqlInsert('Card', req.body);

      res.send({ message: "success" });

    });
  }

  sqlInsert(tableName: string, data: any)  {

    let queryString = 'INSERT INTO ' + tableName + ' VALUES (?';

    //Empty element for ID
    let dataArray = [null];

    for(let key of Object.keys(data)) {
      queryString += ',?'
      dataArray.push(data[key]);
    }

    queryString += ')';
    this.c.query(queryString, dataArray).on('result', (result) => {
      //console.log(result.info.insertId);
    });

  }

}

export default new Server().app;
