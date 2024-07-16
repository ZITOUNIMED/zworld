

var {uconfig} = require('./utils/app-utils.js')
var {sequelize, Professors} = require('./services/database.js');
var { add, deleteById, fetchAll } = require('./services/professors-service.js');

let path = require('path');

const express = require("express");

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  fetchAll(
      professors => {
        res.status(200).json(professors);
    },
    err => {
        console.log(err)
        res.status(500).json(err)
    });
});


app.delete('/:id', function(req, res){
  deleteById(req.params.id,
    () => { 
      console.log('professor deleted!');
      res.status(200).json({success: 'deleted'})
    },
    err => {  
      console.log('error professor delete', err);  
      res.status(500).json(err)
    }
  );
});

app.post('/addprofessor', function (req, res){
  add(req.body,
    () => { 
      console.log('professor added!');
      res.status(200).json({success: 'added'})
    },
    err => {  
      console.log('error student add.', err);  
      res.status(500).json(err)
    }
  );
  
})

app.listen(uconfig.server.port, () => {
  console.log(`Zprofessor api is running on http://localhost:${uconfig.server.port}`);
  console.log(`Greeting: ${uconfig.greetings.msg}`)
  
  sequelize.sync()
  .then(() => {
    console.log('Success db!');

    Professors.bulkCreate(
      [
        {id: 1, fullname: 'Zied zitouni', domain: 'IT'},
        {id: 2, fullname: 'Goutrich Balala', domain: 'Math'}
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
