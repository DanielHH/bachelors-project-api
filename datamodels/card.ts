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

  /**
   * Last verification
   */
  LastVerification?: number;

  /**
   * Last verification
   */
  LastSelfCheck?: number;

  constructor();
  constructor(card: any);

  constructor(card?: any) {
    try {
      if (card.id) {
        this.ID = card.id;
      } else {
        this.ID = null;
      }
      this.CardType = card.cardType.id;
      this.CardNumber = card.cardNumber;

      if (card.user.id) {
        this.UserID = card.user.id;
      } else {
        this.UserID = null;
      }

      this.Location = card.location;
      this.Comment = card.comment;
      this.ExpirationDate = card.expirationDate;
      this.CreationDate = card.creationDate;
      this.ModifiedDate = card.modifiedDate;
      this.Status = card.status.id;

      if (card.activeReceipt) {
        this.ActiveReceipt = card.activeReceipt;
      } else {
        this.ActiveReceipt = null;
      }

      if (card.lastVerificationID) {
        this.LastVerification = card.lastVerificationID;
      } else {
        this.LastVerification = null;
      }

      if (card.lastSelfCheckID) {
        this.LastSelfCheck = card.lastSelfCheckID;
      } else {
        this.LastSelfCheck = null;
      }
    } catch (e) {}
  }
}
