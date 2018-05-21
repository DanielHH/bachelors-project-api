import { StatusTypeDTO } from './statusTypeDTO';

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
  status: StatusTypeDTO;

  constructor();
  constructor(data?: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromOtherType(data);
    } else {
      this.fromDocumentType(data);
    }
  }

  fromOtherType(data: any) {
    try {
      this.id = Number(data.DocumentTypeID);
      this.name = data.DocumentTypeName;
      this.creationDate = data.DocumentTypeCreationDate;
      this.modifiedDate = data.DocumentTypeModifiedDate;
      this.status = new StatusTypeDTO(data.DocumentTypeStatusTypeID, data.DocumentTypeStatusTypeName);
    } catch (e) {}
  }

  fromDocumentType(documentType: any) {
    try {
      this.id = Number(documentType.ID);
      this.name = documentType.Name;
      this.creationDate = documentType.CreationDate;
      this.modifiedDate = documentType.ModifiedDate;
      this.status = new StatusTypeDTO(documentType.StatusTypeID, documentType.StatusTypeName);
    } catch (e) {}
  }
}
