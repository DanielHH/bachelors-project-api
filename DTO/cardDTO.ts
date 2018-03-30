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

      this.cardType = new CardTypeDTO(data.CardTypeID, data.CardTypeName);
      this.cardNumber = data.CardNumber;

      this.user = new UserDTO(
        null,
        data.UserID,
        data.UserType,
        data.Username,
        data.Name,
        data.Email
      );

      this.location = data.CardLocation;
      this.comment = data.CardComment;
      this.expirationDate = data.CardExpirationDate;
      this.creationDate = data.CardCreationDate;
      this.modifiedDate = data.CardModifiedDate;
      this.status = new StatusTypeDTO(data.CardStatusTypeID, data.CardStatusTypeName);
      this.activeReceipt = Number(data.CardActiveReceipt);
      this.lastVerificationID = Number(data.LastVerificationID);
      this.lastVerificationDate = data.LastVerificationDate;

    } catch (e) { }
  }

  fromCard(card: any) {
    try {
      this.id = Number(card.ID);

      this.cardType = new CardTypeDTO(card.CardTypeID, card.CardTypeName);
      this.cardNumber = card.CardNumber;

      this.user = new UserDTO(
        null,
        Number(card.UserID),
        card.UserType,
        card.Username,
        card.Name,
        card.Email
      );

      this.location = card.Location;
      this.comment = card.Comment;
      this.expirationDate = card.ExpirationDate;
      this.creationDate = card.CreationDate;
      this.modifiedDate = card.ModifiedDate;
      this.status = new StatusTypeDTO(card.StatusTypeID, card.StatusTypeName);
      this.activeReceipt = Number(card.ActiveReceipt);
      this.lastVerificationID = Number(card.LastVerificationID);
      this.lastVerificationDate = card.LastVerificationDate;
    } catch (e) { }
  }
}
