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


  constructor();
  constructor(document: any);

  constructor(document?: any) {

    try {
      this.id = document.ID;

      this.documentType = new DocumentTypeDTO(document.DocumentTypeID, document.DocumentTypeName);
      this.documentNumber = document.DocumentNumber;

      this.name = document.Name;
      this.sender = document.Sender;

      this.documentDate = document.DocumentDate;
      this.registrationDate = document.RegistrationDate;
      this.creationDate = document.CreationDate;
      this.modifiedDate = document.ModifiedDate;

      this.user = new UserDTO(
        null,
        document.UserID,
        document.UserType,
        document.Username,
        document.Name,
        document.Email
      );

      this.location = document.Location;
      this.comment = document.Comment;
      this.status = new StatusTypeDTO(document.StatusTypeID, document.StatusTypeName);
      this.activeReceipt = document.ActiveReceipt;

    } catch (e) { }
  }

}
