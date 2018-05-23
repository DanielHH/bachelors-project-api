/**
 * StatusType data model
 */
export class StatusType {
  /**
   * Database ID of the status type
   */
  ID: number;

  /**
   * Name of the status type
   */
  Name: string;

  constructor();
  constructor(statusType?: any);

  constructor(statusType?: any) {
    try {
      if (statusType) {
        this.ID = statusType.id;
        this.Name = statusType.name;
      }
    } catch (e) {}
  }
}
