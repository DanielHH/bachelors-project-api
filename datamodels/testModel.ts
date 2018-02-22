
/**
 * Test data model
*/
export class TestModel {

    id: number;
  
    stringColumn: string;

    constructor(test?: any) {

        this.id = test.ID;
        this.stringColumn = test.StringColumn;

    }
  
}

