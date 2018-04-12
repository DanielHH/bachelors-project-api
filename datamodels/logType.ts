/**
 * LogType data model
 */
export class LogType {

    /**
     * Database ID of the log type
     */
    id: number;
  
    /**
     * Name of the log type
     */
    name: string;

    /**
     * Log text
     */
    logText: string;

    constructor();
    constructor(logType: any);

    constructor(logType?: any) {

      try {
        if(logType.ID)
          this.id = logType.ID;
        this.name = logType.Name;
        this.logText = logType.LogText;
      }
      catch (e) {

      }
    }
  
  }
  