'use strict';
module.exports = (sequelize, DataTypes) => {
    const industryEmissions = sequelize.define('industryEmissions', {
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
        energy : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '에너지'
        },
        process : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '산업공정'
        },
        agriculture : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '농업'
        },
        lulucf : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'LULUCF'
        },
        waste : {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '폐기물'
        }
    }, {
        tableName: 'industryEmissions',
    })
    industryEmissions.associate = function(models){
      industryEmissions.belongsTo(models.year, {
        foreignKey: 'year_id',
        onDelete: 'CASCADE',
      });
    }
    return industryEmissions
}
