/**
 * DocumentType data model
 */
export class DocumentType {
  /**
   * Database ID of the document type
   */
  ID: number;

  /**
   * Name of the document type
   */
  Name: string;

  /**
   * Creation date of DocumentType in database
   */
  CreationDate: Date;

  /**
   * Last modified date of the DocumentType
   */
  ModifiedDate: Date;

  /**
   * ID of DocumentType status type
   */
  StatusTypeID: Number;

  constructor();
  constructor(documentType: any);

  constructor(documentType?: any) {
    this.ID = documentType.id;
    this.Name = documentType.name;
    this.CreationDate = documentType.creationDate;
    this.ModifiedDate = documentType.modifiedDate;
    this.StatusTypeID = documentType.status.id;
  }
}
