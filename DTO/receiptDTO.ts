import { ItemTypeDTO } from './itemTypeDTO';
import { CardDTO } from './cardDTO';
import { DocumentDTO } from './documentDTO';
import { UserDTO } from './userDTO';

/**
 * Receipt data transfer object
 */
export class ReceiptDTO {
  /**
   * Database ID of the receipt
   */
  id: number;

  /**
   * ID of receipt item type
   */
  itemType: number;

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
      this.id = receipt.ID;

      /*
      this.itemType = new ItemTypeDTO(receipt.ItemTypeID, receipt.ItemTypeName);

      if(receipt.CardID) {
        this.card = new CardDTO(receipt);
      }
      else {
        this.card = null;
      }

      if(receipt.DocumentID) {
        this.document = new DocumentDTO();
      }
      else {
        this.card = null;
      }

      this.user = new UserDTO(
        null,
        receipt.UserID,
        receipt.UserType,
        receipt.Username,
        receipt.Name,
        receipt.Email
      );*/

      this.itemType = Number(receipt.ItemType);
      this.cardID = Number(receipt.CardID);
      this.documentID = Number(receipt.DocumentID);
      this.userID = Number(receipt.UserID);

      this.comment = receipt.Comment;
      this.endDate = receipt.EndDate;
      this.startDate = receipt.StartDate;

    } catch (e) {}
  }
}
