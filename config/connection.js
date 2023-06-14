//sort connection from the course material
const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1:27017/onemoresocialnetwork");

module.exports = connection;
