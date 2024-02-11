/**
 * Item model.
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Seminar = sequelize.define('seminar', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    speakers: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    place: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


module.exports = Seminar;