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
    EndDate?: Date;

    constructor();
    constructor(receipt: any);

    constructor(receipt?: any) {

      try {
        if (receipt.id) {
          this.ID = Number(receipt.id);
        } else {
          this.ID = null;
        }

        this.ItemTypeID = receipt.itemType.id;
        
        if (receipt.card) {
          this.CardID = receipt.card.id;
        } else {
          this.CardID = null;
        }

        if (receipt.document) {
          this.DocumentID = receipt.document.id;
        } else {
          this.DocumentID = null;
        }

        this.UserID = receipt.user.id;
        this.StartDate = receipt.startDate;
        this.EndDate = receipt.endDate;
      }
      catch (e) {

      }
    }
  
  
  
  }
  