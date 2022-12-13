'use strict';
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
            comment: '지역명'
        }
    }, {
        tableName: 'region',
    })
    region.associate = function(models){
        // file.belongsTo(models.school, {
        //     foreignKey: 'school_idx',
        //     onDelete: 'CASCADE',
        // })
    }
    return region
}
