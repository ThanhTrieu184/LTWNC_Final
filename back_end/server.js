const express = require("express");
const app = express();
const config = require("./config");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 1804;
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://ltwnc-final.netlify.app",
    "https://laptrinhwebnangcao-final.netlify.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const db = require("./db");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));
app.set("socketio", io);
app.get("/", (req, res) => {
  res.send("hello");
});
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/department.route")(app);
require("./routes/post.route")(app);
require("./routes/announcement.route")(app);
require("./routes/comment.route")(app);

server.listen(PORT, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
