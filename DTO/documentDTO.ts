import { DocumentTypeDTO } from "./documentTypeDTO";
import { UserDTO } from "./userDTO";
import { StatusTypeDTO } from "./statusTypeDTO";

/**
 * Document data transfer object
*/
export class DocumentDTO {

  /**
   * Database ID of the document
   */
  id: number;

  /**
   * Document type
   */
  documentType: DocumentTypeDTO;

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
  user: UserDTO;

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
  status: StatusTypeDTO;

  /**
   * Active receipt (if any)
   */
  activeReceipt?: number;

  /**
   * ID of last verification
   */
  lastVerificationID?: number;

  /**
   * Date of last verification
   */
  lastVerificationDate?: Date;

  /**
   * Registrator
   */
  registrator?: string;


  constructor();
  constructor(data: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromOtherType(data);
    }
    else {
      this.fromDocument(data);
    }

  }

  fromOtherType(data: any) {
    try {
      this.id = Number(data.DocumentID);

      this.documentType = new DocumentTypeDTO(data, true);
      this.documentNumber = data.DocumentNumber;

      this.name = data.DocumentName;
      this.sender = data.DocumentSender;

      this.documentDate = data.DocumentDate;
      this.registrationDate = data.DocumentRegistrationDate;
      this.creationDate = data.DocumentCreationDate;
      this.modifiedDate = data.DocumentModifiedDate;

      this.user = new UserDTO(data, true);

      this.location = data.DocumentLocation;
      this.comment = data.DocumentComment;
      this.status = new StatusTypeDTO(data.DocumentStatusTypeID, data.DocumentStatusTypeName);
      this.activeReceipt = Number(data.DocumentActiveReceipt);
      this.lastVerificationID = Number(data.LastVerificationID);
      this.lastVerificationDate = data.LastVerificationDate;

    } catch (e) { }
  }

  fromDocument(document: any) {
    try {
      this.id = Number(document.ID);

      this.documentType = new DocumentTypeDTO(document, true);
      this.documentNumber = document.DocumentNumber;

      this.name = document.Name;
      this.sender = document.Sender;

      this.documentDate = document.DocumentDate;
      this.registrationDate = document.RegistrationDate;
      this.creationDate = document.CreationDate;
      this.modifiedDate = document.ModifiedDate;

      this.user = new UserDTO(document, true);

      this.location = document.Location;
      this.comment = document.Comment;
      this.status = new StatusTypeDTO(document.StatusTypeID, document.StatusTypeName);

      if (document.ActiveReceipt) {
        this.activeReceipt = Number(document.ActiveReceipt);
      }
      else {
        this.activeReceipt = null;
      }
      
      this.lastVerificationID = Number(document.LastVerificationID);
      this.lastVerificationDate = document.LastVerificationDate;

    } catch (e) { }
  }

}
