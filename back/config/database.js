const { Sequelize } = require('sequelize');
const { DBDIAL, DBNAME, DBUSER, DBPASS, DBHOST, DBLOGC } = require('./general.js');

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS,
    {
        host: DBHOST,
        dialect: DBDIAL,
        logging: DBLOGC,
    }
);

module.exports = sequelize;