import * as mariasql from 'mariasql';
import { TestModel } from '../datamodels/testModel';
import * as _ from 'lodash';

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

    //Wait for the async query to be done before 'returning' the data
    return new Promise((resolve, reject) => {
      this.c.query(queryString, dataArray, (err, rows) => {
        if (!err) resolve(rows.info.insertId);
        reject(err);
      });
    });
  }

  sqlSelectAll(tableName: string) {
    return new Promise((resolve, reject) => {
      this.c.query('SELECT * FROM ' + tableName, false, (err, rows) => {
        if (!err) resolve(rows);
        reject(err);
      });
    });
  }

  /**
   * Update data in database
   * @param tableName Name of database table
   * @param data JSON data object to be updated
   */
  sqlUpdate(tableName: string, data: any) {
    let queryString = 'UPDATE ' + tableName + ' SET ';

    let dataArray = [];

    for (let key of Object.keys(data)) {
      if (key !== 'id') {

        queryString += _.upperFirst(key) + ' = ?, ';

        dataArray.push(data[key]);
      }
    }

    queryString = queryString.slice(0, -2);
    queryString += ' WHERE ID = ' + data.id;

    //Wait for the async query to be done before 'returning' the data
    return new Promise((resolve, reject) => {
      this.c.query(queryString, dataArray, (err, rows) => {
        console.log(err);
        console.log(rows);
        if (!err) resolve(rows.info.affectedRows);
        reject(err);
      });
    });
  }
}
