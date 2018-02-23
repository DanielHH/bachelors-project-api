
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
    userID: number;
  
  
    /**
     * Expiration date of the verification
     */
    verificationDate: Date;

    constructor();
    constructor(verification: any);

    constructor(verification?: any) {

      try {
        if(verification.ID)
          this.id = verification.ID;
        this.verificationType = verification.VerificationType;
        this.itemTypeID = verification.ItemTypeID;
        this.cardID = verification.CardID;
        this.documentID = verification.DucmentID;
        this.userID = verification.UserID;
        this.verificationDate = verification.VerificationDate;
      }
      catch (e) {

      }
    }
  
  
  }
  