/**
 * UserType data model
 */
export class UserType {

    /**
     * Database ID of the user type
     */
    id: number;

    /**
     * Name of the user type
     */
    name: string;

    constructor();
    constructor(userType: any);

    constructor(userType?: any) {

      try {
        if(userType.ID)
          this.id = userType.ID;
        this.name = userType.Name;
      }
      catch (e) {

      }
    }
  
  }
  