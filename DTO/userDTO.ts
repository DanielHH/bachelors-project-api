import { UserTypeDTO } from "./userTypeDTO";

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

  constructor();
  constructor(
    user?: any,
    id?: number,
    userTypeID?: number,
    userTypeName?: string,    
    username?: string,
    name?: string,
    email?: string
  );

  constructor(
    user?: any,
    id?: number,
    userTypeID?: number,
    userTypeName?: string,
    username?: string,
    name?: string,
    email?: string
  ) {
    try {
      if (user) {
        if (user.ID) {
          this.id = Number(user.ID);
        }
        else {
          this.id = null;
        }
        this.userType = new UserTypeDTO(user.UserTypeID, user.UserTypeName);
        this.username = user.Username;
        this.name = user.Name;
        this.email = user.Email;

      }
      else {
        if (id) {
          this.id = Number(id);
        }
        else {
          this.id = null;
        }
        this.userType = new UserTypeDTO(userTypeID, userTypeName);
        this.username = username;
        this.name = name;
        this.email = email;
      }

    } catch (e) { }
  }
}
