/**
 * StatusType data transfer object
 */
export class StatusTypeDTO {

  /**
   * Database ID of the status type
   */
  id: number;

  /**
   * Name of the status type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {

    this.id = Number(id);
    this.name = name;

  }

}
