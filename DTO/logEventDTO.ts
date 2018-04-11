import { ItemTypeDTO } from "./itemTypeDTO";
import { CardDTO } from "./cardDTO";
import { DocumentDTO } from "./documentDTO";
import { UserDTO } from "./userDTO";
import { LogTypeDTO } from "./logTypeDTO";


/**
 * Log event data transfer object
 */
export class LogEventDTO {

    /**
     * Database ID of the log event
     */
    id: number;

    /**
     *  of log event item type (Card or Document)
     */
    itemType: ItemTypeDTO;

    /**
     * Card ID of log event
     */
    card?: CardDTO;

    /**
     * Document ID of log event
     */
    document?: DocumentDTO;

    /**
     * User ID of user who made the event
     */
    user: UserDTO;

    /**
     * ID of log event type (examples: Add new card, Requesting card, Returning card...)
     */
    logType: LogTypeDTO;

    /**
     * Log date of the event
     */
    logDate: Date;
  
    constructor();
    constructor(logEvent: any);
  
    constructor(logEvent?: any) {
      try {
        this.id = Number(logEvent.ID);
  
        this.itemType = new ItemTypeDTO(logEvent.ItemTypeID, logEvent.ItemTypeName);

        
      if(logEvent.CardID) {
        this.card = new CardDTO(logEvent);
      }
      else {
        this.card = null;
      }

      if(logEvent.DocumentID) {
        this.document = new DocumentDTO(logEvent);
      }
      else {
        this.document = null;
      }

      this.user = new UserDTO(
        null,
        logEvent.UserID,
        logEvent.UserTypeID,
        logEvent.UserTypeName,
        logEvent.Username,
        logEvent.Name,
        logEvent.Email
      );


        this.logType = new LogTypeDTO(logEvent.LogTypeID, logEvent.LogTypeName);
  
        this.logDate = logEvent.LogDate;
        
      } catch (e) {}
    }
  }