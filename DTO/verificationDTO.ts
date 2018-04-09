import { ItemTypeDTO } from './itemTypeDTO';
import { VerificationTypeDTO } from './verificationTypeDTO';
import { CardDTO } from './cardDTO';
import { DocumentDTO } from './documentDTO';
import { UserDTO } from './userDTO';

/**
 * Verification data transfer object
 */
export class VerificationDTO {
  /**
   * Database ID of the verification
   */
  id: number;

  /**
   * Verification type
   */
  verificationType: VerificationTypeDTO;

  /**
   * Item type of verification (card/document)
   */
  itemType: ItemTypeDTO;

  /**
   * Card of verification
   */
  card?: CardDTO;

  /**
   * Document of verification
   */
  document?: DocumentDTO;

  /**
   * ID of current item holder
   */
  user?: UserDTO;

  /**
   * Date of the verification
   */
   verificationDate: Date;


  constructor();
  constructor(verification: any);

  constructor(verification?: any) {
    try {
      this.id = Number(verification.ID);

      this.verificationType = new VerificationTypeDTO(verification.ItemTypeID, verification.ItemTypeName);
      
      this.itemType = new ItemTypeDTO(verification.ItemTypeID, verification.ItemTypeName);

      if (verification.CardID) {
        this.card = new CardDTO(verification);
      } else {
        this.card = null;
      }

      if (verification.DocumentID) {
        this.document = new DocumentDTO(verification);
      } else {
        this.document = null;
      }

      this.user = new UserDTO(
        null,
        verification.UserID,
        verification.UserTypeID,
        verification.UserTypeName,
        verification.Username,
        verification.Name,
        verification.Email
      );


      this.verificationDate = verification.VerificationDate;

    } catch (e) {}
  }
}