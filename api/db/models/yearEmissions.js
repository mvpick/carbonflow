'use strict';
module.exports = (sequelize, DataTypes) => {
    const yearEmissions = sequelize.define('yearEmissions', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        yearId : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '연도'
        },
        value : {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '배출량'
        }
    }, {
        tableName: 'yearEmissions',
    })
    return yearEmissions
}
