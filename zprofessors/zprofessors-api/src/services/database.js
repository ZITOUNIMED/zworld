const Sequelize = require("sequelize");
var {uconfig} = require('../utils/app-utils.js')

const sequelize = new Sequelize(uconfig.db.schema,
    uconfig.db.username,
    uconfig.db.password,
    {
        host: uconfig.db.host,
        port: uconfig.db.port,
        dialect: uconfig.db.dialect
    });

const Professors = sequelize.define('professors', {
    fullname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
});


module.exports = {
    sequelize: sequelize,
    Professors
};