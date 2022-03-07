var express = require('express');
var path = require('path');


var indexRouter = require('./routes/index');
var apiRouter = require('./api/api');


var app = express();

app.use(express.json());

//Setup router for the public files
app.use('/', indexRouter);
//Setup router for the api
app.use('/api', apiRouter);

const PORT  = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))


module.exports = app;