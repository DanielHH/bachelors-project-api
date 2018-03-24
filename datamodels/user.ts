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
  constructor(user?: any);

  constructor(user?: any) {
    try {
      if (user) {
        if(user.id)
          this.id = user.id;
        this.userType = user.userType;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
      }
    } catch (e) { }
  }
}
