import * as SqlUtilities from './../utilities/sql-utilities';

/**
 * Card data model
*/
export class Card {

    /**
     * Database ID of the card
     */
    id: number;
  
    /**
     * Card type
     */
    cardType: number;
  
    /**
     * Card serial number (can contain alphabetical characters)
     */
    cardNumber: string;
  
    /**
     * ID of current card holder
     */
    userID: number;
  
    /**
     * Full name of current card holder
     */
    user: string;
  
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

    constructor();
    constructor(card: any);

    constructor(card?: any) {

      try {
        if(card.id)
          this.id = card.id;
        this.cardType = card.cardType;
        this.cardNumber = card.cardNumber;
        this.userID = card.userID;
        this.user = card.user;
        this.location = card.location;
        this.comment = card.comment;
        this.expirationDate = card.date;
      }
      catch (e) {

      }
    }
  
  }
  