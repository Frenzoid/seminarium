/**
 * @author MrFrenzoid
 */

// Force strict mode.
'use strict';

// We grab our libraries.
require('dotenv').config({ path: './utils/.env' });
const express = require('express');
const boom = require('express-boom');
const logger = require('morgan');
const cors = require('cors');

// We grab the configuration items we need.
const { PORT, BPMBLIMIT, LOGGERLVL, DBHOST, DBNAME, DBUSER, DBDIAL, DBRESET } = require('./config/general.js');

// We grab our database connector and tables generator.
const sequelize = require("./config/database.js");
const { createTablesFromModels, issueRelations, insertFillerData } = require("./models/modelsManager.js");

// We grab our helpers
const { jwtMiddleware } = require('./helpers/session')
const { checkBodySizeLimitMiddleware } = require('./helpers/functions.js');

// We grab our routers.
const Routers = require('./routers/masterRouter.js');

// express app.
const app = express();

// Enable cors
app.use(cors())

// Error standarization.
app.use(boom());

// Body parser configuration
app.use(checkBodySizeLimitMiddleware);
app.use(express.json({ limit: BPMBLIMIT }));
app.use(express.urlencoded({ extended: true }));

// Logger to console.
app.use(logger(LOGGERLVL));



// Our routers.
// jwtMiddleware is a middleware that we manually made to check for jwt tokens and auto refesh them.
app.use('/api/auth', Routers.auth);
app.use('/api/users', jwtMiddleware, Routers.user);
app.use('/api/seminars', Routers.seminar);


// Connect with the database, and start express server :D
try {

    // This is dirty, but its the only way to run async code at top level.
    (async () => {

        await sequelize.authenticate();
        console.log(`Sequelize: Successuflly authenticated to: ${DBUSER}@${DBHOST}/${DBNAME}, with dialect: ${DBDIAL}.`);

        // We do what we need to finish setting up the database.
        // issue relations on our migration.
        issueRelations();

        // issue transaction, creating tables from models.
        await createTablesFromModels(DBRESET);

        // Insert filler data.
        // await insertFillerData();

        // Start express server.
        app.listen(PORT, () => {
            console.info(`Express: Server listening on port ${PORT}.`);
        });

    })();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
