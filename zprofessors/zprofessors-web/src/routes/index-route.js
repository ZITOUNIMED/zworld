var { uconfig } = require('../utils/app-utils.js')
var { getAllProfessors } = require('../services/api-service.js');

let systemStatus = {
    id: (1+ Math.floor(Math.random() * 100)),
    upFromTime: new Date(),
    runningTime: '',
}

function indexPage(req, res) {
    getAllProfessors()
    .then(function (response) {
      let dynamicBody = '';
      response.data.forEach(std => {
        dynamicBody = dynamicBody.concat(`<tr><td>${std.id}</td><td>${std.fullname}</td><td>${std.domain}</td><td><a href='/delete/${std.id}'>Remove</a></td></tr>`)
      });

      const nowDate = new Date();
      const diffTime = Math.abs(systemStatus.upFromTime - nowDate);
      const diffMinites = Math.floor(diffTime / (1000 * 60));

      let systemStatusTmpl = `
      <div>
       <div>System Status:</div>
       <div>ID: ${systemStatus.id}</div>
       <div>Running Time: ${diffMinites} minutes</div>
      </div>
      `;

      res.send(
        `<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Z-Professors</title>
            </head>
            <body>
                <h2>Z-Professors</h2>
                <h3>${uconfig.greetings.msg}</h3>
                <div class='container'>
                    <div>
                        <a href='/add-professor-page'>Add New Professor</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th><th>Full Name</th><th>Domain</th><th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${dynamicBody}
                        </tbody>
                    </table>
                </div>
                <hr/>
                ${systemStatusTmpl}
            </body>
        </html>`);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(
        `<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Z-Professor</title>
            </head>
            <body>
                <h2>Z-Professor</h2>
                <h3>${uconfig.greetings.msg}</h3>
                <div style='color: red;'>
                 Error while fetching all professors!
                </div>  
            </body>
        </html>`);
    })
    .finally(function () {
      // always executed
    });
}

module.exports = {
    indexPage,
    systemStatus
};