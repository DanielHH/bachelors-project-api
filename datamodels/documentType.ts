/**
 * DocumentType data model
 */
export class DocumentType {

    /**
     * Database ID of the document type
     */
    id: number;

    /**
     * Name of the document type
     */
    name: string;

    constructor();
    constructor(documentType: any);

    constructor(documentType?: any) {

      try {
        if(documentType.ID)
          this.id = documentType.ID;
        this.name = documentType.Name;
      }
      catch (e) {

      }
    }
  
  }
  