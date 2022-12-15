'use strict';
module.exports = (sequelize, DataTypes) => {
    const enterpriseEmissions = sequelize.define('enterpriseEmissions', {
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
        value: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: '배출량'
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '소재지'
        }
    }, {
        tableName: 'regionEmissions',
    })
    enterpriseEmissions.associate = function(models){
      enterpriseEmissions.belongsTo(models.year, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return enterpriseEmissions
}
