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
    status: Number;

    constructor();
    constructor(card: any);

    constructor(card?: any) {

      try {
        if(card.ID)
          this.id = card.ID;
        this.cardType = card.CardType;
        this.cardNumber = card.CardNumber;
        this.userID = card.UserID;
        this.location = card.Location;
        this.comment = card.Comment;
        this.expirationDate = card.ExpirationDate;
        this.creationDate = card.CreationDate;
        this.modifiedDate = card.ModifiedDate;
        this.status = card.Status;
      }
      catch (e) {

      }
    }
  
  }
  