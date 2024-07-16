var { fetchAll } = require('../services/students-service.js');
var {uconfig} = require('../utils/app-utils.js')

let systemStatus = {
    id: (1+ Math.floor(Math.random() * 100)),
    upFromTime: new Date(),
    runningTime: '',
}

function indexPage(req, res) {
    
    
}

module.exports = {
    indexPage,
    systemStatus
};