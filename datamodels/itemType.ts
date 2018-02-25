/**
 * ItemType data model
 */
export class ItemType {

    /**
     * Database ID of the item type
     */
    id: number;
  
    /**
     * Name of the item type
     */
    name: string;

    constructor();
    constructor(itemType: any);

    constructor(itemType?: any) {

      try {
        if(itemType.ID)
          this.id = itemType.ID;
        this.name = itemType.Name;
      }
      catch (e) {

      }
    }
  
  }
  