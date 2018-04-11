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

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {
    this.id = Number(id);
    this.name = name;
  }
}
