'use strict';
module.exports = (sequelize, DataTypes) => {
    const internationalEmissions = sequelize.define('internationalEmissions', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rank : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '순위'
        },
        country : {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '국가'
        },
        value : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '배출량'
        }
    }, {
        tableName: 'internationalEmissions',
    });

    return internationalEmissions
}
