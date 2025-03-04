const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'compangy-system',
    port: 3306,
    password: 'root',

})

module.exports = pool;





