
/**
 * Verification data model
*/
export class Verification {

    /**
     * Database ID of the verification
     */
    ID: number;
  
    /**
     * Verification type
     */
    VerificationTypeID: number;
  
    /**
     * ID of verification item type
     */
    ItemTypeID: number;
  
    /**
     * Card ID of verification
     */
    CardID?: number;
  
    /**
     * Document ID of verification item type
     */
    DocumentID?: number;
  
    /**
     * ID of current verification holder
     */
    UserID?: number;
  
  
    /**
     * Date of the verification
     */
    verificationDate: Date;

    constructor();
    constructor(verification: any);

    constructor(verification?: any) {

      try {
        if (verification.id) {
          this.ID = Number(verification.id);
        } else {
          this.ID = null;
        }

        this.VerificationTypeID = verification.verificationType.id;
        this.ItemTypeID = verification.itemType.id;

        if (verification.document) {
          this.DocumentID = verification.document.id;
        } else {
          this.DocumentID = null;
        }

        if (verification.card) {
          this.CardID = verification.card.id;
        } else {
          this.CardID = null;
        }

        if (verification.user) {
          this.UserID = verification.user.id;
        } else {
          this.UserID = null;
        }

        this.verificationDate = verification.verificationDate;
      }
      catch (e) {

      }
    }
  
  
  }
  