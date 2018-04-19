/**
 * Document data model
 */
export class Document {
  /**
   * Database ID of the document
   */
  ID: number;

  /**
   * Document type
   */
  DocumentType: number;

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
   * document checked in/out status
   */
  Status: number;

  /**
   * Active receipt (if any)
   */
  ActiveReceipt?: number;

  /**
   * Last verification
   */
  LastVerification?: number;

  constructor();
  constructor(document: any);

  constructor(document?: any) {
    if (document.id) {
      this.ID = document.id;
    } else {
      this.ID = null;
    }
    this.DocumentType = document.documentType.id;
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
    this.Status = document.status.id;

    if (document.activeReceipt) {
      this.ActiveReceipt = document.activeReceipt;
    } else {
      this.ActiveReceipt = null;
    }

    if (document.lastVerificationID) {
      this.LastVerification = document.lastVerificationID;
    } else {
      this.LastVerification = null;
    }
  }
}
