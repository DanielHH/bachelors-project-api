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

    var c = new mariasql();
    c.connect({
      host: dbconfig.host,
      user: dbconfig.username,
      password: dbconfig.password,
      db: dbconfig.db,
      charset: "utf8"
    });

    this.app.get("/", (req, res) => {
      c.query("SELECT * FROM TestTable", (err, rows) => {
        if (!err)
          res.send(new TestModel(rows[0].ID, rows[0].StringColumn));
      });
    });

    this.app.post("/testPost", (req, res) => {
      
      console.log(req.body);
      res.send({message: "success"});

    });

    this.app.post("/addNewCard", (req, res) => {
    
      var newCard = new Card();
      newCard = req.body;
      const queryStr = "INSERT INTO Card (CardType, CardNumber, UserID, User, Location, Comment, ExpirationDate) VALUES (" +
      req.body.cardType + ", '" + req.body.cardNumber + "' , " + req.body.userID + ", '" + req.body.user + "', '" +
      req.body.location + "', '" + req.body.comment + "', '" + req.body.expirationDate + "');";
      
      console.log(queryStr);
      
      c.query(queryStr, (err, rows) => {
        if (err)
          console.log(err);
      });

      res.send({message: "success"});

    });
  }
}

export default new Server().app;
