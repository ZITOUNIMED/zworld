let { Students } = require('./database.js');

function fetchAll(successCallback, errorCallback){
    Students.findAll()
    .then(res => {
      console.log('success fetch all students!');
      successCallback(res)
    })
    .catch(err => {
     console.log('Error when fetch all students!');
     errorCallback(err)
    })
}

function add(entity, successCallback, errorCallback){
    Students.create(entity).then(res => {
        console.log('success fetch all students!');
        successCallback(res)
    }).catch((err) => {
        console.log('Error when fetch all students!');
        errorCallback(err)
    });
}

function deleteById(id, successCallback, errorCallback){
    Students.destroy({
        where: { id: id }
      }).then(res => {
        console.log('success delete student!');
        successCallback(res)
    }).catch((err) => {
        console.log('Error when delete student!');
        errorCallback(err)
    });
}

module.exports = {
    fetchAll: fetchAll,
    add: add,
    deleteById
};