/**
 * Receipt data model
*/
export class Receipt {

    /**
     * Database ID of the receipt
     */
    id: number;
  
    /**
     * ID of receipt item type
     */
    itemTypeID: number;
  
    /**
     * Card ID of receipt
     */
    cardID?: number;
  
    /**
     * Document ID of receipt item type
     */
    documentID?: number;
  
    /**
     * ID of current receipt holder
     */
    userID: number;
  
    /**
     * Start date of the receipt
     */
    startDate: Date;
  
    /**
     * End date of the receipt
     */
    endDate: Date;
  
    /**
     * Comment
     */
    comment: string;

    constructor();
    constructor(receipt: any);

    constructor(receipt?: any) {

      try {
        if(receipt.ID)
          this.id = receipt.ID;
        this.itemTypeID = receipt.itemTypeID;
        this.cardID = receipt.CardID;
        this.documentID = receipt.DocumentID;
        this.userID = receipt.UserID;
        this.startDate = receipt.StartDate;
        this.endDate = receipt.EndDate;
        this.comment = receipt.Comment;
      }
      catch (e) {

      }
    }
  
  
  
  }
  