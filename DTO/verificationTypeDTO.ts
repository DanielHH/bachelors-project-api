/**
 * VerificationType data transfer object
 */
export class VerificationTypeDTO {
  /**
   * Database ID of the verification type
   */
  id: number;

  /**
   * Name of the verification type
   */
  name: string;

  constructor();
  constructor(id?: number, name?: string);

  constructor(id?: number, name?: string) {
    this.id = Number(id);
    this.name = name;
  }
}
