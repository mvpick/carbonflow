'use strict';
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
            comment: '연도명'
        }
    }, {
        tableName: 'year',
    })
    year.associate = function(models){
        // file.belongsTo(models.school, {
        //     foreignKey: 'school_idx',
        //     onDelete: 'CASCADE',
        // })
    }
    return year
}
