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
    image: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    speakers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    txtcolor: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bgrcolor: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Seminar;