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
  itemType: ItemTypeDTO;

  /**
   * Card ID of receipt
   */
  card?: CardDTO;

  /**
   * Document ID of receipt item type
   */
  document?: DocumentDTO;

  /**
   * ID of current receipt holder
   */
  user: UserDTO;

  /**
   * Start date of the receipt
   */
  startDate: Date;

  /**
   * End date of the receipt
   */
  endDate: Date;

  /**
   * URL to pdf
   */
  url?: string;

  constructor();
  constructor(receipt: any);

  constructor(receipt?: any) {
    try {
      this.id = Number(receipt.ID);

      
      this.itemType = new ItemTypeDTO(receipt.ItemTypeID, receipt.ItemTypeName);

      if(receipt.CardID) {
        this.card = new CardDTO(receipt, true);
      }
      else {
        this.card = null;
      }

      if(receipt.DocumentID) {
        this.document = new DocumentDTO(receipt, true);
      }
      else {
        this.document = null;
      }

      this.user = new UserDTO(receipt, true);

      this.startDate = receipt.StartDate;
      this.endDate = receipt.EndDate;
      this.url = receipt.host + '/pdfs/' + receipt.PDFName;

    } catch (e) {}
  }
}
