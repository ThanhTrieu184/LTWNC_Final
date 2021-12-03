const express = require("express");
const app = express();
const config = require("./config");
const PORT = config.PORT;
const http = require("http");
const server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const db = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.set("socketio", io);

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/department.route")(app);
require("./routes/post.route")(app);
require("./routes/announcement.route")(app);

server.listen(PORT, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
