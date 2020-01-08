var mysql = require('mysql');
var config = require('./config')

var con = mysql.createConnection({
  host: config.DB.DB_SERVER,
  user: config.DB.DB_USER,
  port: config.DB.DB_PORT,
  password: config.DB.DB_PASS,
  database: config.DB.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = con;