const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Schedule = sequelize.define('schedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isTimeFormat(value) {
        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
          throw new Error('Invalid time format for one of the Schedules. Time field must have HH:mm format.');
        }
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'One of the name fields of the schedule is empty.',
      },
    },
  },
});

module.exports = Schedule;
