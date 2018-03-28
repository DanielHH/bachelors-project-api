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

  constructor();
  constructor(receipt: any);

  constructor(receipt?: any) {
    try {
      this.id = Number(receipt.ID);

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

      this.itemTypeID = Number(receipt.ItemTypeID);
      this.cardID = receipt.CardID ? Number(receipt.CardID) : null;
      this.documentID = receipt.DocumentID ? Number(receipt.DocumentID) : null;
      this.userID = Number(receipt.UserID);

      this.endDate = receipt.EndDate;
      this.startDate = receipt.StartDate;

    } catch (e) {}
  }
}
