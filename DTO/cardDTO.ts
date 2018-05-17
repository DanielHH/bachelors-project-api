import { UserDTO } from './userDTO';
import { StatusTypeDTO } from './statusTypeDTO';
import { CardTypeDTO } from './cardTypeDTO';

/**
 * Card data transfer object
 */
export class CardDTO {
  /**
   * Database ID of the card
   */
  id: number;

  /**
   * Card type
   */
  cardType: CardTypeDTO;

  /**
   * Card serial number (can contain alphabetical characters)
   */
  cardNumber: string;

  /**
   * Current card holder
   */
  user: UserDTO;

  /**
   * Current location of card
   */
  location: string;

  /**
   * Comment
   */
  comment: string;

  /**
   * Expiration date of the card
   */
  expirationDate: Date;

  /**
   * Creation date of card in database
   */
  creationDate: Date;

  /**
   * Last modified date of the card
   */
  modifiedDate: Date;

  /**
   * Card checked in/out status
   */
  status: StatusTypeDTO;

  /**
   * Active receipt (if any)
   */
  activeReceiptID?: number;

  /**
   * ID of last verification
   */
  lastVerificationID?: number;

  /**
   * Date of last verification
   */
  lastVerificationDate?: Date;

  /**
   * ID of last self check
   */
  lastSelfCheckID?: number;

  /**
   * Date of last self check
   */
  lastSelfCheckDate?: Date;


  /**
   * Registrator
   */
  registrator?: string;

  constructor();
  constructor(data?: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromOtherType(data);
    } else {
      this.fromCard(data);
    }
  }

  fromOtherType(data: any) {
    try {
      this.id = Number(data.CardID);

      this.cardType = new CardTypeDTO(data, true);
      this.cardNumber = data.CardNumber;

      this.user = new UserDTO(data, true);

      this.location = data.CardLocation;
      this.comment = data.CardComment;
      this.expirationDate = data.CardExpirationDate;
      this.creationDate = data.CardCreationDate;
      this.modifiedDate = data.CardModifiedDate;
      this.status = new StatusTypeDTO(data.StatusTypeID, data.StatusTypeName);
      this.activeReceiptID = Number(data.CardActiveReceiptID);
      this.lastVerificationID = Number(data.LastVerificationID);
      this.lastVerificationDate = data.LastVerificationDate;
      this.lastSelfCheckID = Number(data.LastSelfCheckID);
      this.lastSelfCheckDate = data.LastSelfCheckDate;
    } catch (e) {}
  }

  fromCard(card: any) {
    try {
      this.id = Number(card.ID);

      this.cardType = new CardTypeDTO(card, true);
      this.cardNumber = card.CardNumber;

      this.user = new UserDTO(card, true);

      this.location = card.Location;
      this.comment = card.Comment;
      this.expirationDate = card.ExpirationDate;
      this.creationDate = card.CreationDate;
      this.modifiedDate = card.ModifiedDate;
      this.status = new StatusTypeDTO(card.StatusTypeID, card.StatusTypeName);
      if (card.ActiveReceiptID) {
        this.activeReceiptID = Number(card.ActiveReceiptID);
      } else {
        this.activeReceiptID = null;
      }
      this.lastVerificationID = Number(card.LastVerificationID);
      this.lastVerificationDate = card.LastVerificationDate;
      this.lastSelfCheckID = Number(card.LastSelfCheckID);
      this.lastSelfCheckDate = card.LastSelfCheckDate;
    } catch (e) {}
  }
}
