

var {uconfig} = require('./utils/app-utils.js')
var {sequelize, Students} = require('./services/database.js');
var { add, deleteById, fetchAll } = require('./services/students-service.js');
//var { indexPage } = require('./routes/index-route.js');
let path = require('path');

const express = require("express");

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  fetchAll(
      students => {
        res.status(200).json(students);
    },
    err => {
        console.log(err)
        res.status(500).json(err)
    });
});


app.delete('/:id', function(req, res){
  deleteById(req.params.id,
    () => { 
      console.log('student deleted!');
      res.status(200).json({success: 'deleted'})
    },
    err => {  
      console.log('error student delete', err);  
      res.status(500).json(err)
    }
  );
});

app.post('/addstudent', function (req, res){
  add(req.body,
    () => { 
      console.log('student added!');
      res.status(200).json({success: 'added'})
    },
    err => {  
      console.log('error student add.', err);  
      res.status(500).json(err)
    }
  );
  
})

app.listen(uconfig.server.port, () => {
  console.log(`Example app listening at http://localhost:${uconfig.server.port}`);
  console.log(`Greeting: ${uconfig.greetings.msg}`)
  
  sequelize.sync()
  .then(() => {
    console.log('Success db!');

    Students.bulkCreate(
      [
        {id: 1, firstname: 'med', lastname: 'zit'},
        {id: 2, firstname: 'alex', lastname: 'dubois'}
      ],
      {
        ignoreDuplicates: true,
      }
    ).then(() => {
      console.log('success bulk create!')
    })
    .catch(err => {
      console.log('error while bulk create: ', err)
    })
  }).catch((error) => {
      console.error('Error db:', error);
  });
});
