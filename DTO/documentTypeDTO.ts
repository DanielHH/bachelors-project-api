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

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {

    this.id = id;
    this.name = name;

  }
}
