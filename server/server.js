const express = require("express");
const bodyParser = require("body-parser");
global.logger = require('./services/logger');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser'); // module for parsing cookies

// Cookie parser must be set up before the routes as routes will read cookies
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// START BUILD LOGIN LINK
app.use(function (req, res, next) {
  let username = req.cookies['username'];
  let loginLink = '';
  if (username) {
    loginLink = "Hi, " + username + " ";
    loginLink+= "<a href='javascript:void(0);' onClick='logOut();'>Logout</a>";
  } else {
    const google = require('googleapis').google;
    const OAuth2 = google.auth.OAuth2;
    const config = require("./config/auth.config");
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
      config.oauth2Credentials.client_id,
      config.oauth2Credentials.client_secret,
      config.oauth2Credentials.redirect_uris[0]
    );
    // Obtain the google login link to which we'll send our users to give us access
    loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
      scope: config.oauth2Credentials.scopes
    });
    loginLink = '<a href="' + loginLink + '">Login with Google</a>';
  }
  res.locals = {
    loginLink: loginLink
  };
  next();
});
// END BUILD LOGIN LINK

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// routes
require('./routes/auth.routes')(app);
require('./routes/index.routes')(app);
require('./routes/user.routes')(app);

//const cors = require("cors");
// let corsOptions = {
//   origin: ["http://localhost", "http://blog.ezcg.com", "https://blog.ezcg.com"]
// };
// app.use(cors(corsOptions));

// log requests
app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  let str = req.method + " " + req.originalUrl + " ";
  if (req.method === 'GET' && Object.values(req.query).length) {
    str+= JSON.stringify(req.query);
  } else if (Object.values(req.body).length && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')){
    let dataArr = {};
    for(let i in req.body) {
      let value = req.body[i];
      if (value.length > 400) {
        value = value.substr(0,400) + " __TRUNCATED__";
      }
      dataArr[i] = value;
    }
    str+= JSON.stringify(dataArr);
  }
  logger.info(str);
  next();
});

// serve all the static files in the /public directory in the project root.
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/test", (req, res, next) => {

  res.render('pages/body', { title: 'Hey', body: 'Hello from server.js! This is a simple, non-authenticated route set in /app/server.js' })

});

// if (process.env.ENVIRONMENT !== 'dev') {
//   const db = require("./app/models");
//   // force: true will drop the table if it already exists
//   db.sequelize.sync({force: false}).then(() => {
//     //initial();
//     logger.log('info',"db.sequelize.sync run");
//   });
// }

// const dbConfig = require("./app/config/db.config.js");
// console.log("db prod configs", dbConfig);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// this matches all routes and all methods
// app.use((req, res, next) => {
//   const error = new Error("Page not found")
//   error.status = 404
//   next(error);
// })

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
  logger.info(`Environment is ${process.env.ENVIRONMENT}.`);
});

// error handler
// app.use(function(err, req, res, next) {
//   // log error
//   logger.error(err.message);
//   res.locals = {
//     loginLink: ""
//   };
//   // render the error page
//   //res.status(err.status || 500);
//   if (req.headers['content-type'] && req.headers['content-type'].indexOf("multipart/form-data") !== -1) {
//     res.status(400).send({error: JSON.stringify(err)});
//   } else {
//     res.render('pages/error.ejs', { error: err.message })
//   }
// });

process.on('uncaughtException', function (err) {
  logger.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  logger.error(err.stack)
})

process.on('warning', e => console.warn(e.stack));

function initial() {
//   for(let roleName in Roles) {
//     Role.create({
//       id: Roles[roleName],
//       name: roleName
//     });
//   }
}
