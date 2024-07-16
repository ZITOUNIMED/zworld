var axios = require('axios');
var { uconfig } = require('../utils/app-utils.js')

var apiUrl = `http://${uconfig.api.host}:${uconfig.api.port}`;

function getAllStudents(){
    return axios.get(apiUrl+'/');
}

function addStudent(student){
    return axios.post(apiUrl+ '/addstudent', student)
}


function deleteStudent(id){
    return axios.delete(apiUrl+ `/${id}`)
}

module.exports = {
    getAllStudents,
    addStudent,
    deleteStudent
};