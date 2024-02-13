/**
 * General Congiruations for all the app.
 */

// Port
const PORT = Number(process.env.PORT) ?? 3000;

// Body parser mb data limit
const BPMBLIMIT = process.env.BPMBLIMIT;


// Log level
const LOGGERLVL = process.env.LOGGERLVL;


// JWT Secret word or phrase
const JWTSECRET = process.env.JWTSECRET;

// JWT expire time.
const JWTEXPIRE = process.env.JWTEXPIRE;


// Type of dialect (kind of database: mysql, postgres, maria...)
const DBDIAL = process.env.DBDIAL;

// Database name.
const DBNAME = process.env.DBNAME;

// User databse username.
const DBUSER = process.env.DBUSER;

// User database password.
const DBPASS = process.env.DBPASS;

// Database server address (ip or hostname).
const DBHOST = process.env.DBHOST;

// Enable database logging to node console.
const DBLOGC = (process.env.DBLOGC == 'true' ? true : false);

// Reset database on server start.
const DBRESET = (process.env.DBRESET == 'true' ? true : false);

// Salt Level for user password encryption
const SALTLVL = Number(process.env.SALTLVL) ?? 10;


const config = {
    PORT,
    BPMBLIMIT,
    LOGGERLVL,
    JWTSECRET,
    JWTEXPIRE,
    DBDIAL,
    DBNAME,
    DBUSER,
    DBPASS,
    DBHOST,
    DBLOGC,
    DBRESET,
    SALTLVL
}

// Log general config. Remove on prod.
module.exports = config;