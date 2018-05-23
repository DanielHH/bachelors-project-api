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
import { queries } from './database-queries';
import { configGetRequests } from './http-requests/get-requests';
import { configPostRequests } from './http-requests/post-requests';
import { configPutRequests } from './http-requests/put-requests';
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

    let appObject = {app: this.app, sqlUtil: this.sqlUtil, pdfUtil: this.pdfUtil};

    configGetRequests(appObject);

    configPostRequests(appObject);

    configPutRequests(appObject);

  }

  private config() {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
}

export default new Server().app;
