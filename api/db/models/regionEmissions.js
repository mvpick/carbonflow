'use strict';
module.exports = (sequelize, DataTypes) => {
    const regionEmissions = sequelize.define('regionEmissions', {
        id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        value: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '배출량'
        }
    }, {
        tableName: 'regionEmissions',
    })
    regionEmissions.associate = function(models){
      regionEmissions.belongsTo(models.region, {
        foreignKey: 'region_id',
        onDelete: 'CASCADE',
      });
      regionEmissions.belongsTo(models.year, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return regionEmissions
}
