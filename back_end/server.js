const express = require("express");
const app = express();
const PORT = 1804;
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

server.listen(PORT, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
