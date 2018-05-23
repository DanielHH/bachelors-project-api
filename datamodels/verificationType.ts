/**
 * VerificationType data model
 */
export class VerificationType {
  /**
   * Database ID of the verification type
   */
  ID: number;

  /**
   * Name of the verification type
   */
  Name: string;

  constructor();
  constructor(verificationType: any);

  constructor(verificationType?: any) {
    try {
      if (verificationType.id) this.ID = verificationType.id;
      this.Name = verificationType.name;
    } catch (e) {}
  }
}
