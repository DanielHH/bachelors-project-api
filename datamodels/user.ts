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
    constructor(user: any);

    constructor(user?: any) {

      try {
        if(user.ID)
          this.id = user.ID;
        this.userType = user.UserType;
        this.username = user.Username;
        this.name = user.Name;
        this.email = user.Email;
      }
      catch (e) {

      }
  
  }

}
