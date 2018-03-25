import { SqlUtilities } from '../utilities/sql-utilities';

/**
 * CardType data model
 */
export class CardType {
  /**
   * Database ID of the card type
   */
  id: number;

  /**
   * Name of the card type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string, cardType?: any);

  constructor(id?: number, name?: string, cardType?: any) {

    if(!cardType) {
      this.id = id;
      this.name = name;
    }

    else {
      if (cardType.ID) {
        this.id = cardType.ID;
        this.name = cardType.Name;
      }
    }
  }
}
