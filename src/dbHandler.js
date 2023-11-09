const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


const connectToDB = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected to the MySQL server.');
        resolve();
      }
    });
  });
};

const createRecord = async (collection, data) => {
  try {
    await connectToDB();
    const query = `INSERT INTO ${collection} SET ?`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query, data, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const getRecord = async (collection, id) => {
  try {
    await connectToDB();
    const query = `SELECT * FROM ${collection} WHERE id = ?`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query, id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const updateRecord = async (collection, id, data) => {
  try {
    await connectToDB();
    const query = `UPDATE ${collection} SET ? WHERE id = ?`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [data, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteRecord = async (collection, id) => {
  try {
    await connectToDB();
    const query = `DELETE FROM ${collection} WHERE id = ?`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query, id, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { createRecord, getRecord, updateRecord, deleteRecord };
