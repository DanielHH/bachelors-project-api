/**
 * UserType data model
 */
export class UserType {

    /**
     * Database ID of the user type
     */
    ID: number;

    /**
     * Name of the user type
     */
    Name: string;

    constructor();
    constructor(userType: any);

    constructor(userType?: any) {

      try {
        if(userType.ID) {
          this.ID = userType.ID;
        }
        this.Name = userType.Name;
      }
      catch (e) {

      }
    }
  
  }
  