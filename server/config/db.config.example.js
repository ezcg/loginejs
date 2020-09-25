let devObj = {
  host: "db",
  user: "root",
  password: "root",
  db: "login",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
let prodObj = {
  user: "...",
  password: "...",
  host: "database-1.....amazonaws.com",
  db: "blog",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
//let devObj = prodObj;

let moduleExport = {};
if (process.env.ENVIRONMENT === 'prod') {
  moduleExport = prodObj;
} else {
  moduleExport = devObj;
}

module.exports = moduleExport;
