const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Function to load schema files and build the DB schema
const loadSchemas = async () => {
  try {
    const schemaDir = path.join(__dirname, 'schemas');
    
    if (!fs.existsSync(schemaDir)) {
      console.error(`Schema directory '${schemaDir}' does not exist.`);
      return;
    }
    const schemaFiles = fs.readdirSync(schemaDir);
    
    schemaFiles.forEach((file) => {
      const schemaPath = path.join(schemaDir, file);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const { tableName, fields } = schema;
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(',')})`;
      connection.query(createTableQuery, (error, results, fields) => {
        if (error) {
          console.log('MySQL Connection Configuration:', {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME, // Or DB_USER, based on your .env file
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });
          throw error};
        console.log(`Table ${tableName} has been created or updated.`);
      });
    });
  } catch (error) {
    console.error('Error loading schemas:', error);
  }
};

module.exports = { loadSchemas };
