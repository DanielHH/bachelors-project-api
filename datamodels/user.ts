/**
 * User data model
 */
export class User {
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
    id?: number,
    userType?: number,
    username?: string,
    name?: string,
    email?: string,
    user?: any
  );

  constructor(
    id?: number,
    userType?: number,    
    username?: string,
    name?: string,
    email?: string,
    user?: any
  ) {
    try {
      if (!user) {
        this.id = id;
        this.userType = userType;
        this.username = username;
        this.name = name;
        this.email = email;
      } else {
        this.id = user.ID;
        this.userType = user.UserType;
        this.username = user.Username;
        this.name = user.Name;
        this.email = user.Email;
      }
    } catch (e) {}
  }
}
