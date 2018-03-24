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
  userType: number;

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
    userType?: number,
    username?: string,
    name?: string,
    email?: string
  );

  constructor(
    user?: any,
    id?: number,
    userType?: number,
    username?: string,
    name?: string,
    email?: string
  ) {
    try {
      if (user) {
        this.id = user.ID;
        this.userType = user.UserType;
        this.username = user.Username;
        this.name = user.Name;
        this.email = user.Email;

      }
      else {
        this.id = id;
        this.userType = userType;
        this.username = username;
        this.name = name;
        this.email = email;
      }

    } catch (e) { }
  }
}
