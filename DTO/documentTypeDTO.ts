import { StatusType } from "../datamodels/statusType";
import { StatusTypeDTO } from "./statusTypeDTO";

/**
 * DocumentType data transfer object
 */
export class DocumentTypeDTO {

  /**
   * Database ID of the document type
   */
  id: number;

  /**
   * Name of the document type
   */
  name: string;

  /**
   * Creation date of DocumentType in database
   */
  creationDate: Date;

  /**
   * Last modified date of the DocumentType
   */
  modifiedDate: Date;

  /**
   * DocumentType active/inactive status
   */
  status: StatusType;

  constructor();
  constructor(data?: any);

  constructor(data?: any) {

    this.id = Number(data.DocumentTypeID);
    this.name = data.DocumentTypeName;
    this.creationDate = data.DocumentTypeCreationDate;
    this.modifiedDate = data.DocumentTypeModifiedDate;
    this.status = new StatusTypeDTO(data.StatusTypeID, data.StatusTypeName);

  }
}
