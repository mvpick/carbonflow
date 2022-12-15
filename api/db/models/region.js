'use strict';
module.exports = (sequelize, DataTypes) => {
    const region = sequelize.define('region', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '지역명'
        }
    }, {
        tableName: 'region',
    })
    region.associate = function(models){
      region.hasMany(models.regionEmissions, {
        foreignKey: 'region_id',
        onDelete: 'CASCADE',
      });
    }
    return region
}
