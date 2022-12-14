'use strict';
module.exports = (sequelize, DataTypes) => {
    const industryEmissions = sequelize.define('industryEmissions', {
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
        energy : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '에너지'
        },
        process : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '산업공정'
        },
        agriculture : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '농업'
        },
        lulucf : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'LULUCF'
        },
        waste : {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '폐기물'
        }
    }, {
        tableName: 'industryEmissions',
    })
    return industryEmissions
}
