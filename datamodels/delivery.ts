/**
 * Document delivery data model
*/
export class Delivery {

    /**
     * Database ID of the document
     */
    id: number;

    /**
     * Document type
     */
    documentType: number;

    /**
     * Document serial number (can contain alphabetical characters)
     */
    documentNumber: string;

    /**
     * Document name
     */
    name: string;

    /**
     * Document date
     */
    documentDate: Date;

    /**
     * Registration date
     */
    sentDate: Date;

   /**
     * Creation date of document in database
     */
    creationDate: Date;

    /**
     * Last modified date of the document
     */
    modifiedDate: Date;

    /**
     * Current location of document
     */
    receiver: string;

    /**
     * Comment
     */
    comment: string;

    /**
     * document checked in/out status
     */
    status: number;

    constructor();
    constructor(document: any);

    constructor(document?: any) {

      try {
        if(document.ID)
          this.id = document.ID;
        this.documentType = document.DocumentType;
        this.documentNumber = document.DocumentNumber;
        this.name = document.Name;
        this.documentDate = document.DocumentDate;
        this.sentDate = document.RegistrationDate;
        this.creationDate = document.CreationDate;
        this.modifiedDate = document.ModifiedDate;
        this.receiver = document.Location;
        this.comment = document.Comment;
        this.status = document.Status;
      }
      catch (e) {

      }
    }

  }
