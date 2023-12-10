const SyncMySQL = require('sync-mysql');
const dbConfig = require("./config/db.config");
//console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
const connection = new SyncMySQL({
  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  database: dbConfig.DATABASE,
  password: dbConfig.PASSWORD,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
});

try {
  
  connection.query('USE '+dbConfig.DATABASE);
  console.error('Database is connected:', connection);
} catch (err) {
  console.error('Database not connected:', err.code);
}

module.exports = connection;