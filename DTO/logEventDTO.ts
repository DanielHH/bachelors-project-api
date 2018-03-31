/**
 * Log event data transfer object
 */
export class LogEventDTO {
    /**
     * Database ID of the log event
     */
    id: number;
    /**
     * ID of log event item type (Card or Document)
     */
    itemTypeID: number;
    /**
     * Card ID of log event
     */
    cardID?: number;
    /**
     * Document ID of log event
     */
    documentID?: number;
    /**
     * Owner ID of log event
     */
    ownerID?: number;
    /**
     * User ID of user who made the event
     */
    userID: number;
    /**
     * ID of log event type (examples: Add new card, Requesting card, Returning card...)
     */
    logTypeID: number;
    /**
     * Log date of the event
     */
    logDate: Date;
  
    constructor();
    constructor(logEvent: any);
  
    constructor(logEvent?: any) {
      try {
        this.id = Number(logEvent.ID);
  
        this.itemTypeID = Number(logEvent.ItemTypeID);

        this.cardID = logEvent.CardID ? Number(logEvent.CardID) : null;
  
        this.documentID = logEvent.DocumentID ? Number(logEvent.DocumentID) : null;

        this.ownerID = logEvent.OwnerID ? Number(logEvent.OwnerID) : null;
  
        this.userID = Number(logEvent.UserID);
  
        this.logTypeID = Number(logEvent.LogTypeID);
  
        this.logDate = logEvent.LogDate;
        
      } catch (e) {}
    }
  }