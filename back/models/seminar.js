const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Seminar = sequelize.define('seminar', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide a title for the seminar." },
            notEmpty: { msg: "The title cannot be empty." }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide a description for the seminar." },
            notEmpty: { msg: "The description cannot be empty." }
        }
    },
    speakers: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide the speakers' names for the seminar." },
            notEmpty: { msg: "The speaker's names cannot be empty." }
        }
    },
    txtcolor: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#000000'
    },
    bgrcolor: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#FFFFFF'
    },
    date: {
        type: Sequelize.DATEONLY, // DATEONLY for 'YYYY-MM-DD' format
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide a date for the seminar." },
            isDate: { msg: "Please provide a valid date in the format DD/MM/YYYY." },
            validateDateIsFuture(value) {
                if (value < new Date().toISOString().split('T')[0]) {
                    throw new Error("The date must be in the future.");
                }
            }
        }
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Please provide a location for the seminar." },
            notEmpty: { msg: "The location cannot be empty." }
        }
    }
});

module.exports = Seminar;
