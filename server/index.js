const express =  require('express');
const path = require('path');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socket = require('./utils/socket')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors());
app.use("/api/match", require("./routes/matchRoutes") )

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("SERVER IS UP & RUNNING");
});
socket.attach(server)
