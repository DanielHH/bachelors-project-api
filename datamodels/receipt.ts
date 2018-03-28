/**
 * Receipt data model
*/
export class Receipt {

    /**
     * Database ID of the receipt
     */
    ID: number;
  
    /**
     * ID of receipt item type
     */
    ItemTypeID: number;
  
    /**
     * Card ID of receipt
     */
    CardID?: number;
  
    /**
     * Document ID of receipt item type
     */
    DocumentID?: number;
  
    /**
     * ID of current receipt holder
     */
    UserID: number;
  
    /**
     * Start date of the receipt
     */
    StartDate: Date;
  
    /**
     * End date of the receipt
     */
    EndDate: Date;
  
    /**
     * Comment
     */
    Comment: string;

    constructor();
    constructor(receipt: any);

    constructor(receipt?: any) {

      try {
        if(receipt.ID) {
          this.ID = Number(receipt.id);
        }
        else {
          this.ID = null;
        }

        this.ItemTypeID = receipt.itemType.ID;
        
        if(receipt.cardID) {
          this.CardID = receipt.card.ID;
        }
        else {
          this.CardID = null;
        }

        if(receipt.documentID) {
          this.DocumentID = receipt.document.ID;
        }
        else {
          this.DocumentID = null;
        }

        this.UserID = receipt.user.ID;
        this.StartDate = receipt.startDate;
        this.EndDate = receipt.endDate;
        this.Comment = receipt.comment;
      }
      catch (e) {

      }
    }
  
  
  
  }
  