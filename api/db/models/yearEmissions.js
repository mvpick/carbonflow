'use strict';
module.exports = (sequelize, DataTypes) => {
    const yearEmissions = sequelize.define('yearEmissions', {
        id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        value : {
          type: DataTypes.STRING,
          allowNull: true,
          comment: '배출량'
        }
    }, {
        tableName: 'yearEmissions',
    })
    yearEmissions.associate = function(models){
      yearEmissions.belongsTo(models.year, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return yearEmissions
}
