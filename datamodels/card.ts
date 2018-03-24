/**
 * Card data model
*/
export class Card {

  /**
   * Database ID of the card
   */
  ID: number;

  /**
   * Card type
   */
  CardType: number;

  /**
   * Card serial number (can contain alphabetical characters)
   */
  CardNumber: string;

  /**
   * ID of current card holder
   */
  UserID: number;

  /**
   * Current location of card
   */
  Location: string;

  /**
   * Comment
   */
  Comment: string;

  /**
   * Expiration date of the card
   */
  ExpirationDate: Date;

  /**
   * Creation date of card in database
   */
  CreationDate: Date;

  /**
   * Last modified date of the card
   */
  ModifiedDate: Date;

  /**
   * Card checked in/out status
   */
  Status: Number;

  /**
   * Active receipt (if any)
   */
  ActiveReceipt?: number;

  constructor();
  constructor(card: any);

  constructor(card?: any) {
    try {
      if (card.id) {
        this.ID = card.id;
      }
      else {
        this.ID = null;
      }
      this.CardType = card.cardType.id;
      this.CardNumber = card.cardNumber;
      this.UserID = card.user.id;
      this.Location = card.location;
      this.Comment = card.comment;
      this.ExpirationDate = card.expirationDate;
      this.CreationDate = card.creationDate;
      this.ModifiedDate = card.modifiedDate;
      this.Status = card.status.id;
      this.ActiveReceipt = card.activeReceipt;
    }
    catch (e) {

    }
  }

}
