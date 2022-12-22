'use strict';
module.exports = (sequelize, DataTypes) => {
    const enterpriseEmissions = sequelize.define('enterpriseEmissions', {
        id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        companyName: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '업체명'
        },
        value: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '배출량'
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '소재지'
        },
        lat: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '위도'
        },
        lng: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '경도'
        }
    }, {
        tableName: 'enterpriseEmissions',
    })
    enterpriseEmissions.associate = function(models){
      enterpriseEmissions.belongsTo(models.year, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return enterpriseEmissions
}
