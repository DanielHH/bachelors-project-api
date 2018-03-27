/**
 * Document delivery data model
*/
export class Delivery {

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
    Status: number;

    constructor();
    constructor(document: any);

    constructor(document?: any) {

      try {
        if (document.id) {
          this.ID = document.id;
        }
        else {
          this.ID = null;
        }
        this.DocumentType = document.documentType.id;
        this.DocumentNumber = document.documentNumber;
        this.Name = document.name;
        this.DocumentDate = document.documentDate;
        this.SentDate = document.sentDate;
        this.CreationDate = document.creationDate;
        this.ModifiedDate = document.modifiedDate;
        this.Receiver = document.receiver;
        this.Comment = document.comment;
        this.Status = document.status.id;
      }
      catch (e) {

      }
    }

  }
