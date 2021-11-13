const express = require("express");
const app = express();
const config = require("./config");
const PORT = config.PORT;
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
const db = require("./db");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

require("./routes/auth.route")(app);
server.listen(PORT, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
