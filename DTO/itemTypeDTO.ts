/**
 * ItemType data transfer object
 */
export class ItemTypeDTO {
  /**
   * Database ID of the item type
   */
  id: number;

  /**
   * Name of the item type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}
