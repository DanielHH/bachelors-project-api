import * as mariasql from 'mariasql';

/**
 * SQL function utilities
 */
export class SqlUtilities {
  /**
   * MariaDB database connection
   */
  c: any;

  constructor(c: any) {
    this.c = c;
  }

  /**
   * Insert data into database
   * @param tableName Name of database table
   * @param data JSON data object to be inserted
   */
  sqlInsert(tableName: string, data: any) {
    let queryString = 'INSERT INTO ' + tableName + ' VALUES (?';

    //Empty element for ID
    let dataArray = [null];

    for (let key of Object.keys(data)) {
      queryString += ',?';
      dataArray.push(data[key]);
    }

    queryString += ')';

    this.c.query(queryString, dataArray).on('result', result => {
      data.id = result.info.insertId;
    });
    return data;
  }
}
