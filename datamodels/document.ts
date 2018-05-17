/**
 * Document data model
 */
export class Document {
  /**
   * Database ID of the document
   */
  ID: number;

  /**
   * ID of document type
   */
  DocumentTypeID: number;

  /**
   * Document serial number (can contain alphabetical characters)
   */
  DocumentNumber: string;

  /**
   * Document name
   */
  Name: string;

  /**
   * Document sender
   */
  Sender: string;

  /**
   * Document date
   */
  DocumentDate: Date;

  /**
   * Registration date
   */
  RegistrationDate: Date;

  /**
   * Creation date of document in database
   */
  CreationDate: Date;

  /**
   * Last modified date of the document
   */
  ModifiedDate?: Date;

  /**
   * ID of current document holder
   */
  UserID?: number;

  /**
   * Current location of document
   */
  Location: string;

  /**
   * Comment
   */
  Comment?: string;

  /**
   * ID of document status type
   */
  StatusTypeID: number;

  /**
   * ID of active receipt (if any)
   */
  ActiveReceiptID?: number;

  /**
   * ID of last verification (if any)
   */
  LastVerificationID?: number;

  /**
   * ID of last self check (if any)
   */
  LastSelfCheckID?: number;

  constructor();
  constructor(document: any);

  constructor(document?: any) {
    if (document.id) {
      this.ID = document.id;
    } else {
      this.ID = null;
    }
    this.DocumentTypeID = document.documentType.id;
    this.DocumentNumber = document.documentNumber;
    this.Name = document.name;
    this.Sender = document.sender;
    this.DocumentDate = document.documentDate;
    this.RegistrationDate = document.registrationDate;
    this.CreationDate = document.creationDate;
    this.ModifiedDate = document.modifiedDate;

    if (document.user.id) {
      this.UserID = document.user.id;
    } else {
      this.UserID = null;
    }

    this.Location = document.location;
    this.Comment = document.comment;
    this.StatusTypeID = document.status.id;

    if (document.activeReceiptID) {
      this.ActiveReceiptID = document.activeReceiptID;
    } else {
      this.ActiveReceiptID = null;
    }

    if (document.lastVerificationID) {
      this.LastVerificationID = document.lastVerificationID;
    } else {
      this.LastVerificationID = null;
    }

    if (document.lastSelfCheckID) {
      this.LastSelfCheckID = document.lastSelfCheckID;
    } else {
      this.LastSelfCheckID = null;
    }
  }
}
