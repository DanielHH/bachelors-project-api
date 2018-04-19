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
  VerificationType: number;

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
  VerificationDate: Date;

  constructor();
  constructor(verification: any);

  constructor(verification?: any) {
    try {
      if (verification.id) {
        this.ID = Number(verification.id);
      } else {
        this.ID = null;
      }

      this.VerificationType = verification.verificationType.id;
      this.ItemTypeID = verification.itemType.id;

      if (verification.card) {
        this.CardID = Number(verification.card.id);
      } else {
        this.CardID = null;
      }

      if (verification.document) {
        this.DocumentID = Number(verification.document.id);
      } else {
        this.DocumentID = null;
      }

      if (verification.user.id) {
        this.UserID = Number(verification.user.id);
      } else {
        this.UserID = null;
      }

      this.VerificationDate = verification.verificationDate;
    } catch (e) {}
  }
}
