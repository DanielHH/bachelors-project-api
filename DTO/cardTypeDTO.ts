import { StatusType } from '../datamodels/statusType';
import { StatusTypeDTO } from './statusTypeDTO';

/**
 * CardType data transfer object
 */
export class CardTypeDTO {
  /**
   * Database ID of the card type
   */
  id: number;

  /**
   * Name of the card type
   */
  name: string;

  /**
   * Creation date of CardType in database
   */
  creationDate: Date;

  /**
   * Last modified date of the CardType
   */
  modifiedDate: Date;

  /**
   * CardType active/inactive status
   */
  status: StatusType;

  constructor();
  constructor(data?: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromFromOtherType(data);
    }
    else {
      this.fromCardType(data);
    }
  }

  fromFromOtherType(data: any) {
    try {
      this.id = Number(data.CardTypeID);
      this.name = data.CardTypeName;
      this.creationDate = data.CardTypeCreationDate;
      this.modifiedDate = data.CardTypeModifiedDate;
      this.status = new StatusTypeDTO(data.CardTypeStatusTypeID, data.CardTypeStatusTypeName);

    } catch (e) { }
  }

  fromCardType(cardType: any) {
    try {
      this.id = Number(cardType.ID);
      this.name = cardType.Name;
      this.creationDate = cardType.CreationDate;
      this.modifiedDate = cardType.ModifiedDate;
      this.status = new StatusTypeDTO(cardType.StatusTypeID, cardType.StatusTypeName);
    } catch (e) { }
  }
}
