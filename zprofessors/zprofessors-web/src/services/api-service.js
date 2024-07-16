var axios = require('axios');
var { uconfig } = require('../utils/app-utils.js')

var apiUrl = `http://${uconfig.api.host}:${uconfig.api.port}`;

function getAllProfessors(){
    return axios.get(apiUrl+'/');
}

function addProfessor(professor){
    return axios.post(apiUrl+ '/addprofessor', professor)
}


function deleteProfessor(id){
    return axios.delete(apiUrl+ `/${id}`)
}

module.exports = {
    getAllProfessors,
    addProfessor,
    deleteProfessor
};