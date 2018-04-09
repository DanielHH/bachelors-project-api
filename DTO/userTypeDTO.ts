/**
 * UserType data transfer object
 */
export class UserTypeDTO {

  /**
   * Database ID of the user type
   */
  id: number;

  /**
   * Name of the user type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {

    this.id = Number(id);
    this.name = name;

  }
}
