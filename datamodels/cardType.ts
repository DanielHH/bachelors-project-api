
/**
 * CardType data model
 */
export class CardType {
  /**
   * Database ID of the CardType
   */
  ID: number;

  /**
   * Name of the CardType
   */
  Name: string;

  /**
   * Creation date of CardType in database
   */
  CreationDate: Date;

  /**
   * Last modified date of the CardType
   */
  ModifiedDate: Date;

  /**
   * ID of cardType status type
   */
  StatusTypeID: Number;

  constructor();
  constructor(cardType?: any);

  constructor(cardType?: any) {
    this.ID = cardType.id;
    this.Name = cardType.name;
    this.CreationDate = cardType.creationDate;
    this.ModifiedDate = cardType.modifiedDate;
    this.StatusTypeID = cardType.status.id;
  }
}
