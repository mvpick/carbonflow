const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const region = sequelize.define('region', {
    idx : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '지역 이름'
    },
  }, {
    tableName: 'region',
  })
  // region.associate = function(models){
  //   region.belongsTo(models.lecture, {
  //         foreignKey: 'lecture_idx',
  //         onDelete: 'CASCADE',
  //     })
  // }
  return region
}
