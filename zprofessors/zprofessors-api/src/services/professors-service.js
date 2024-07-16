let { Professors } = require('./database.js');

function fetchAll(successCallback, errorCallback){
    Professors.findAll()
    .then(res => {
      console.log('success fetch all professors!');
      successCallback(res)
    })
    .catch(err => {
     console.log('Error when fetch all professors!');
     errorCallback(err)
    })
}

function add(entity, successCallback, errorCallback){
    Professors.create(entity).then(res => {
        console.log('success fetch all professors!');
        successCallback(res)
    }).catch((err) => {
        console.log('Error when fetch all professors!');
        errorCallback(err)
    });
}

function deleteById(id, successCallback, errorCallback){
    Professors.destroy({
        where: { id: id }
      }).then(res => {
        console.log('success delete professor!');
        successCallback(res)
    }).catch((err) => {
        console.log('Error when delete professor!');
        errorCallback(err)
    });
}

module.exports = {
    fetchAll: fetchAll,
    add: add,
    deleteById
};