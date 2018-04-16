import { DocumentTypeDTO } from "./documentTypeDTO";
import { StatusTypeDTO } from "./statusTypeDTO";

/**
 * Document delivery data transfer object
*/
export class DeliveryDTO {

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
   * Document date
   */
  documentDate: Date;

  /**
   * Sent date
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
  status: StatusTypeDTO;

  constructor();
  constructor(document: any);

  constructor(document?: any) {
    try {
      this.id = Number(document.ID);

      this.documentType = new DocumentTypeDTO(document, true);


      this.documentNumber = document.DocumentNumber;
      this.name = document.Name;
      this.documentDate = document.DocumentDate;
      this.sentDate = document.SentDate;
      this.creationDate = document.CreationDate;
      this.modifiedDate = document.ModifiedDate;
      this.receiver = document.Receiver;
      this.comment = document.Comment;

      this.status = new StatusTypeDTO(document.StatusTypeID, document.StatusTypeName);
    } catch (e) { }

  }

}
