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
  constructor(cardType?: any);

  constructor(cardType?: any) {

    this.id = cardType.ID;
    this.name = cardType.Name;

  }
}
