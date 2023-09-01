
require("dotenv").config();

const http = require("http");

const app = require("./startup/app");



require('./routers')(app)
require('./middleware')(app)
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`Your app is listening on port `, PORT);
});