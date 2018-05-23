/**
 * ItemType data model
 */
export class ItemType {
  /**
   * Database ID of the item type
   */
  ID: number;

  /**
   * Name of the item type
   */
  Name: string;

  constructor();
  constructor(itemType: any);

  constructor(itemType?: any) {
    try {
      if (itemType.ID) this.ID = itemType.id;
      this.Name = itemType.name;
    } catch (e) { }
  }
}
