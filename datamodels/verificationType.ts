/**
 * VerificationType data model
 */
export class VerificationType {

    /**
     * Database ID of the verification type
     */
    id: number;
  
    /**
     * Name of the verification type
     */
    name: string;

    constructor();
    constructor(verificationType: any);

    constructor(verificationType?: any) {

      try {
        if(verificationType.ID)
          this.id = verificationType.ID;
          this.name = verificationType.Name;
      }
      catch (e) {

      }
    }
  
  }
  