/**
 * StatusType data model
 */
export class StatusType {

  /**
   * Database ID of the status type
   */
  id: number;

  /**
   * Name of the status type
   */
  name: string;

  constructor();
  constructor(statusType?: any);

  constructor(statusType?: any) {

    try {
      if (statusType) {
        this.id = statusType.ID;
        this.name = statusType.Name;
      }

    }
    catch (e) {

    }
  }

}
