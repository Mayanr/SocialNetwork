const express = require("express");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');

const app = express();
//connect Database
mongoose.connect('mongodb://localhost/soc_network', { useNewUrlParser: true, useCreateIndex: true } );
require('./config/mongoose.js');

//init Middleware
app.use(express.json({extend: false}));

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//defaults to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));