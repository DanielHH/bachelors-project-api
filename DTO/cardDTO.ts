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
   * ID of current card holder
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
  activeReceipt?: number;

  /**
   * ID of last verification
   */
  lastVerificationID?: number;

  /**
   * Date of last verification
   */
  lastVerificationDate?: Date;

  constructor();
  constructor(data?: any);

  constructor(data?: any) {
    if (data.CardID) {
      this.fromJoin(data);
    }
    else {
      this.fromCard(data);
    }
  }

  fromJoin(data: any) {
    try {
      this.id = Number(data.CardID);

      this.cardType = new CardTypeDTO(data);
      this.cardNumber = data.CardNumber;

      this.user = new UserDTO(data);

      this.location = data.CardLocation;
      this.comment = data.CardComment;
      this.expirationDate = data.CardExpirationDate;
      this.creationDate = data.CardCreationDate;
      this.modifiedDate = data.CardModifiedDate;
      this.status = new StatusTypeDTO(data.StatusTypeID, data.StatusTypeName);
      this.activeReceipt = Number(data.CardActiveReceipt);
      this.lastVerificationID = Number(data.LastVerificationID);
      this.lastVerificationDate = data.LastVerificationDate;

    } catch (e) { }
  }

  fromCard(card: any) {
    try {
      this.id = Number(card.ID);

      this.cardType = new CardTypeDTO(card);
      this.cardNumber = card.CardNumber;

      this.user = new UserDTO(card);

      this.location = card.Location;
      this.comment = card.Comment;
      this.expirationDate = card.ExpirationDate;
      this.creationDate = card.CreationDate;
      this.modifiedDate = card.ModifiedDate;
      this.status = new StatusTypeDTO(card.StatusTypeID, card.StatusTypeName);
      if (card.ActiveReceipt) {
        this.activeReceipt = Number(card.ActiveReceipt);
      }
      else {
        this.activeReceipt = null;
      }
      this.lastVerificationID = Number(card.LastVerificationID);
      this.lastVerificationDate = card.LastVerificationDate;
    } catch (e) { }
  }
}
