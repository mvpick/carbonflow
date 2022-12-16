'use strict';
module.exports = (sequelize, DataTypes) => {
    const targetEmissions = sequelize.define('targetEmissions', {
        id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        company_name: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '기업명'
        },
        value: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '배출량'
        },
        category: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '업종'
        },
        rank: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: '배출순위'
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '소재지'
        },
        standard: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '적용기준'
        }
    }, {
        tableName: 'targetEmissions',
    })
    return targetEmissions
}
