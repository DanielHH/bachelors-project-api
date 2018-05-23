/**
 * Document delivery data model
 */
export class Delivery {
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
   * Document date
   */
  DocumentDate: Date;

  /**
   * Registration date
   */
  SentDate: Date;

  /**
   * Creation date of document in database
   */
  CreationDate: Date;

  /**
   * Last modified date of the document
   */
  ModifiedDate: Date;

  /**
   * Current location of document
   */
  Receiver: string;

  /**
   * Comment
   */
  Comment: string;

  /**
   * document checked in/out status
   */
  StatusTypeID: number;

  constructor();
  constructor(document: any);

  constructor(document?: any) {
    try {
      if (document.id) {
        this.ID = document.id;
      } else {
        this.ID = null;
      }
      this.DocumentTypeID = document.documentType.id;
      this.DocumentNumber = document.documentNumber;
      this.Name = document.name;
      this.DocumentDate = document.documentDate;
      this.SentDate = document.sentDate;
      this.CreationDate = document.creationDate;
      this.ModifiedDate = document.modifiedDate;
      this.Receiver = document.receiver;
      this.Comment = document.comment;
      this.StatusTypeID = document.status.id;
    } catch (e) {}
  }
}
