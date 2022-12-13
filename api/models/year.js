const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const year = sequelize.define('year', {
    idx : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name : {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '연도 이름'
    },
  }, {
    tableName: 'year',
  })
  // region.associate = function(models){
  //   region.belongsTo(models.lecture, {
  //         foreignKey: 'lecture_idx',
  //         onDelete: 'CASCADE',
  //     })
  // }
  return year
}
