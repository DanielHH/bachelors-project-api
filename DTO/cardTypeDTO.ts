/**
 * CardType data transfer object
 */
export class CardTypeDTO {
  /**
   * Database ID of the card type
   */
  id: number;

  /**
   * Name of the card type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {

    this.id = id;
    this.name = name;

  }
}
