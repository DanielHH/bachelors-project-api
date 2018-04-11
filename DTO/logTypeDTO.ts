/**
 * LogType data transfer object
 */
export class LogTypeDTO {
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
  constructor(id?: number, name?: string, logText?: string);

  constructor(id?: number, name?: string, logText?: string) {
    this.id = Number(id);
    this.name = name;
    this.logText = logText;
  }
}
