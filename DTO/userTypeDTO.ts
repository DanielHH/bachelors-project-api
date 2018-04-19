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
  constructor(data?: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromFromOtherType(data);
    } else {
      this.fromUserType(data);
    }
  }

  fromFromOtherType(data: any) {
    try {
      this.id = Number(data.UserTypeID);
      this.name = data.UserTypeName;
    } catch (e) {}
  }

  fromUserType(userType: any) {
    try {
      this.id = Number(userType.ID);
      this.name = userType.Name;
    } catch (e) {}
  }
}
