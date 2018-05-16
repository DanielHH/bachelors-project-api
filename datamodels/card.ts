/**
 * Card data model
 */
export class Card {
  /**
   * Database ID of the card
   */
  ID: number;

  /**
   * Card type ID
   */
  CardTypeID: number;

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
   * ID of card status type
   */
  StatusTypeID: Number;

  /**
   * ID of active receipt (if any)
   */
  ActiveReceiptID?: number;

  /**
   * ID of last verification (if any)
   */
  LastVerificationID?: number;

  /**
   * ID of last verification (if any)
   */
  LastSelfCheckID?: number;

  constructor();
  constructor(card: any);

  constructor(card?: any) {
    try {
      if (card.id) {
        this.ID = card.id;
      } else {
        this.ID = null;
      }
      this.CardTypeID = card.cardType.id;
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
      this.StatusTypeID = card.status.id;

      if (card.activeReceipt) {
        this.ActiveReceiptID = card.activeReceipt;
      } else {
        this.ActiveReceiptID = null;
      }

      if (card.lastVerificationID) {
        this.LastVerificationID = card.lastVerificationID;
      } else {
        this.LastVerificationID = null;
      }

      if (card.lastSelfCheckID) {
        this.LastSelfCheckID = card.lastSelfCheckID;
      } else {
        this.LastSelfCheckID = null;
      }
    } catch (e) {}
  }
}
