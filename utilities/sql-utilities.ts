
/**
 * SQL function utilities
 */
export class SqlUtilities {
  constructor() {}

  /**
   * Insert data into database
   * @param tableName Name of database table
   * @param data JSON data object to be inserted
   */
  sqlInsert(tableName: string, data: any) {
    let queryString = 'INSERT INTO ' + tableName + ' SET ';

    let dataArray = [];

    for (let key of Object.keys(data)) {
      queryString += key + ' = ?,';
      dataArray.push(data[key]);
    }

    queryString = queryString.slice(0, -1);

    //Wait for the async query to be done before 'returning' the data
    return new Promise((resolve, reject) => {
      global.db.query(queryString, dataArray, (err, rows) => {
        if (!err) resolve(rows.info.insertId);
        reject(err);
      });
    });
  }

  sqlSelectAll(tableName: string) {
    return new Promise((resolve, reject) => {
      global.db.query('SELECT * FROM ' + tableName, false, (err, rows) => {
        if (!err) resolve(rows);
        reject(err);
      });
    });
  }

  sqlSelectID(tableName: string, id: number) {
    return new Promise((resolve, reject) => {
      global.db.query('SELECT * FROM ' + tableName + ' WHERE ID = ?', [id], false, (err, rows) => {
        if (!err) resolve(rows[0]);
        reject(err);
      });
    });
  }

  sqlSelectUsername(username: string) {
    return new Promise((resolve, reject) => {
      global.db.query(
        'SELECT User.*, UserType.ID AS UserTypeID, UserType.Name AS UserTypeName FROM User LEFT JOIN (UserType) ON (UserType.ID=User.UserTypeID) WHERE User.Username=?',
        [username],
        false,
        (err, rows) => {
          if (!err) resolve(rows[0]);
          reject(err);
        }
      );
    });
  }

  sqlSelectQuery(query: string, queryData?: any[]) {
    return new Promise((resolve, reject) => {
      global.db.query(query, queryData, false, (err, rows) => {
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
      queryString += key + ' = ?,';
      dataArray.push(data[key]);
    }

    queryString = queryString.slice(0, -1);

    queryString += ' WHERE ID = ' + data.ID;

    //Wait for the async query to be done before 'returning' the data
    return new Promise((resolve, reject) => {
      global.db.query(queryString, dataArray, (err, rows) => {
        if (!err) resolve(rows.info.affectedRows);
        reject(err);
      });
    });
  }
}
