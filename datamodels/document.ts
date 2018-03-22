
/**
 * Document data model
*/
export class Document {

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
     * Document sender
     */
    sender: string;

    /**
     * Document date
     */
    documentDate: Date;

    /**
     * Registration date
     */
    registrationDate: Date;

    /**
     * Creation date of document in database
     */
    creationDate: Date;

    /**
     * Last modified date of the document
     */
    modifiedDate: Date;

    /**
     * ID of current document holder
     */
    userID: number;
  
    /**
     * Current location of document
     */
    location: string;
  
    /**
     * Comment
     */
    comment: string;

    /**
     * document checked in/out status
     */
    status: number;

    /**
     * Active receipt (if any)
     */
    activeReceipt?: number;

    constructor();
    constructor(document: any);

    constructor(document?: any) {

      try {
        if(document.ID)
          this.id = document.ID;
        this.documentType = document.DocumentType;
        this.documentNumber = document.DocumentNumber;
        this.name = document.Name;
        this.sender = document.Sender;
        this.documentDate = document.DocumentDate;
        this.registrationDate = document.RegistrationDate;
        this.creationDate = document.CreationDate;
        this.modifiedDate = document.ModifiedDate;
        this.userID = document.UserID;
        this.location = document.Location;
        this.comment = document.Comment;
        this.status = document.Status;
        this.activeReceipt = null;
      }
      catch (e) {

      }
    }
  
  }
  