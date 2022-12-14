'use strict';
module.exports = (sequelize, DataTypes) => {
    const year = sequelize.define('year', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '연도명'
        }
    }, {
        tableName: 'year',
    })
    return year
}


