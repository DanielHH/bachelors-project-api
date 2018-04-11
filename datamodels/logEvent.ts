/**
 * LogEvent data model
 */
export class LogEvent {
  /**
   * Database ID of the log event
   */
  ID: number;
  /**
   * ID of log event item type (Card or Document)
   */
  ItemTypeID: number;
  /**
   * Card ID of log event
   */
  CardID?: number;
  /**
   * Document ID of log event
   */
  DocumentID?: number;
  /**
   * Current owner ID of log event
   */
  ownerID?: number;
  /**
   * User ID of user who made the event
   */
  UserID: number;
  /**
   * ID of log event type (examples: Add new card, Requesting card, Returning card...)
   */
  LogTypeID: number;
  /**
   * Log date of the event
   */
  LogDate: Date;

  /**
   * Log text
   */
  LogText: string;

  constructor();
  constructor(logEvent: any);

  constructor(logEvent?: any) {
    try {
      if (logEvent.ID) {
        this.ID = Number(logEvent.id);
      } else {
        this.ID = null;
      }

      this.ItemTypeID = logEvent.itemTypeID;

      if (logEvent.cardID) {
        this.CardID = logEvent.cardID;
      } else {
        this.CardID = null;
      }

      if (logEvent.documentID) {
        this.DocumentID = logEvent.documentID;
      } else {
        this.DocumentID = null;
      }

      if (logEvent.ownerID) {
        this.ownerID = logEvent.ownerID;
      } else {
        this.ownerID = null;
      }

      if (logEvent.userID) {
        this.UserID = logEvent.userID;
      } else {
        this.UserID = null;
      }

      this.LogTypeID = logEvent.logTypeID;

      this.LogDate = logEvent.logDate;

      this.LogText = logEvent.logText;
    } catch (e) {}
  }
}
