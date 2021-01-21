const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());
app.use('/',routes);

app.listen(port,function(){
    console.log("Server running in", port);
})