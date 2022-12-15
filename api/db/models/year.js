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
    year.associate = function(models){
      year.hasMany(models.industryEmissions, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
      year.hasMany(models.regionEmissions, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
      year.hasMany(models.yearEmissions, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
      year.hasMany(models.enterpriseEmissions, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return year
}


