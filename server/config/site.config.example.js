let port = process.env.PORT;
let devObj = {
  url:"http://localhost:" + port
};
let prodObj = {
  url:"http://localhost:" + port
};

let moduleExport = {};
if (process.env.ENVIRONMENT === 'prod') {
  moduleExport = prodObj;
} else {
  moduleExport = devObj;
}

module.exports = moduleExport;
