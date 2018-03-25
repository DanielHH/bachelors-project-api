import { CardType } from '../datamodels/cardType';
import { User } from '../datamodels/user';
import { StatusType } from '../datamodels/statusType';

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
  cardType: CardType;

  /**
   * Card serial number (can contain alphabetical characters)
   */
  cardNumber: string;

  /**
   * ID of current card holder
   */
  user: User;

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
  status: StatusType;

  constructor();
  constructor(card: any);

  constructor(card?: any) {
    try {
      this.id = card.ID;

      this.cardType = new CardType(card.CardTypeID, card.CardTypeName);
      this.cardNumber = card.CardNumber;

      this.user = new User(
        card.UserID,
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
      this.status = card.Status;
    } catch (e) {}
  }
}
