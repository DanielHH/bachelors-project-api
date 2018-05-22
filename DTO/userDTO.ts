import { UserTypeDTO } from './userTypeDTO';
import { StatusTypeDTO } from './statusTypeDTO';

/**
 * User data transfer object
 */
export class UserDTO {
  /**
   * Database ID of the user
   */
  id: number;

  /**
   * User type
   */
  userType: UserTypeDTO;

  /**
   * Username
   */
  username: string;

  /**
   * Full name of user
   */
  name: string;

  /**
   * Email
   */
  email: string;

  /**
   * Creation date of User in database
   */
  creationDate: Date;

  /**
   * Last modified date of User
   */
  modifiedDate: Date;

  /**
   * User active/inactive status
   */
  status: StatusTypeDTO;

  constructor();

  constructor(data?: any, fromOtherType?: boolean);

  constructor(data?: any, fromOtherType?: boolean) {
    if (fromOtherType) {
      this.fromOtherType(data);
    } else {
      this.fromUser(data);
    }
  }

  fromOtherType(data: any) {
    try {
      this.id = Number(data.UserID);
      this.username = data.UserUsername;
      this.name = data.UserName;
      this.userType = new UserTypeDTO(data, true);
      this.email = data.Email;
      this.creationDate = data.UserCreationDate;
      this.modifiedDate = data.UserModifiedDate;
      this.status = new StatusTypeDTO(data.UserStatusTypeID, data.UserStatusTypeName);
    } catch (e) {}
  }

  fromUser(user: any) {
    try {
      this.id = Number(user.ID);
      this.username = user.Username;
      this.name = user.Name;
      this.userType = new UserTypeDTO(user, true);
      this.email = user.Email;
      this.creationDate = user.CreationDate;
      this.modifiedDate = user.ModifiedDate;
      this.status = new StatusTypeDTO(user.StatusTypeID, user.StatusTypeName);
    } catch (e) {}
  }
}
