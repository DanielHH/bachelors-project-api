/**
 * User data model
 */
export class User {
  /**
   * Database ID of the user
   */
  ID: number;

  /**
   * User type ID
   */
  UserTypeID: number;

  /**
   * Username
   */
  Username: string;

  /**
   * Full name of user
   */
  Name: string;

  /**
   * Email
   */
  Email: string;

  /**
   * Creation date of User in database
   */
  CreationDate: Date;

  /**
   * Last modified date of User
   */
  ModifiedDate: Date;

  /**
   * ID of User status type
   */
  StatusTypeID: number;

  /**
   * User password for when adding a new user
   */
  Password?: string;

  constructor();
  constructor(user?: any);

  constructor(user?: any) {
    try {
      if (user.id) {
        this.ID = user.id;
      } else {
        this.ID = null;
      }
      this.UserTypeID = user.userType.id;
      this.Username = user.username;
      this.Name = user.name;
      this.Email = user.email;
      this.CreationDate = user.creationDate;
      this.ModifiedDate = user.modifiedDate;
      this.StatusTypeID = user.status.id;
      if (user.password) {
        this.Password = user.password;
      }
    } catch (e) {}
  }
}
