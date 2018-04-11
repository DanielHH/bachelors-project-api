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
   * Log data
   */
  LogData: string;

  constructor();
  constructor(logEvent: any);

  constructor(logEvent?: any) {
    try {
      if (logEvent.id) {
        this.ID = Number(logEvent.id);
      } else {
        this.ID = null;
      }

      this.ItemTypeID = logEvent.itemType.id;

      if (logEvent.card) {
        this.CardID = logEvent.card.id;
      } else {
        this.CardID = null;
      }

      if (logEvent.document) {
        this.DocumentID = logEvent.document.id;
      } else {
        this.DocumentID = null;
      }

      if (logEvent.user) {
        this.UserID = logEvent.user.id;
      } else {
        this.UserID = null;
      }

      this.LogTypeID = logEvent.logType.id;

      this.LogDate = logEvent.logDate;

      this.LogData = logEvent.logText;
    } catch (e) {}
  }
}
