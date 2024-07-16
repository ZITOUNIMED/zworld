

var {uconfig} = require('./utils/app-utils.js')
var { indexPage } = require('./routes/index-route.js');
var { addStudent, deleteStudent } = require('./services/api-service.js');

let path = require('path');

const express = require("express");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', indexPage);

app.get('/add-student-page', function(req, res) {
  res.sendFile(path.join(__dirname, '/templates/add-student-page.html'));
});

app.post('/addstudent', function (req, res){
  addStudent(req.body)
  .then(function (response) {
    res.redirect("/");
  })
  .catch(function (err) {
    res.sendFile(path.join(__dirname, './templates/error-page.html'));
  });
  
});

app.get('/delete/:id', function(req, res){
  deleteStudent(req.params.id)
  .then(function () {
    res.redirect("/");
  })
  .catch(function (err) {
    res.sendFile(path.join(__dirname, './templates/error-page.html'));
  });
});


app.listen(uconfig.server.port, () => {
  console.log(`Zstudents Web App listening at http://localhost:${uconfig.server.port}`);
  console.log(`Greeting: ${uconfig.greetings.msg}`)
});
