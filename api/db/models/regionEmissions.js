'use strict';
module.exports = (sequelize, DataTypes) => {
    const regionEmissions = sequelize.define('regionEmissions', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        year_id : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '연도'
        },
        region_id : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '지역'
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: '배출량'
        }
    }, {
        tableName: 'regionEmissions',
    })
    return regionEmissions
}
