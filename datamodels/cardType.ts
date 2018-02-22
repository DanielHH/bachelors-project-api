/**
 * CardType data model
 */
export class CardType {

    /**
     * Database ID of the card type
     */
    id: number;

    /**
     * Name of the card type
     */
    name: string;

    constructor();
    constructor(cardType: any);

    constructor(cardType?: any) {

      try {
        if(cardType.ID)
          this.id = cardType.ID;
        this.name = cardType.Name;
      }
      catch (e) {

      }
    }
  
  }
  