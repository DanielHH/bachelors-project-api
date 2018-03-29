
/**
 * Verification data model
*/
export class Verification {

    /**
     * Database ID of the verification
     */
    id: number;
  
    /**
     * Verification type
     */
    verificationType: number;
  
    /**
     * ID of verification item type
     */
    itemTypeID: number;
  
    /**
     * Card ID of verification
     */
    cardID?: number;
  
    /**
     * Document ID of verification item type
     */
    documentID?: number;
  
    /**
     * ID of current verification holder
     */
    userID?: number;
  
  
    /**
     * Date of the verification
     */
    verificationDate: Date;

    constructor();
    constructor(verification: any);

    constructor(verification?: any) {

      try {
        if (verification.ID)
          this.id = Number(verification.ID);
          this.verificationType = verification.VerificationType;
          this.itemTypeID = verification.ItemTypeID;

          if (verification.DocumentID) {
            this.documentID = verification.DocumentID;
          } else {
            this.documentID = null;
          }

          if (verification.CardID) {
            this.cardID = verification.CardID;
          } else {
            this.cardID = null;
          }

          if (verification.userID) {
            this.userID = verification.UserID;
          } else {
            this.userID = null;
          }

          this.verificationDate = verification.VerificationDate;
      }
      catch (e) {

      }
    }
  
  
  }
  