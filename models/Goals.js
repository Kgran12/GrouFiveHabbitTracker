const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goals extends Model {}

Goals.init(
{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    goal_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goal_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goal_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    goal_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'goals',
  }
);

module.exports = Goals;