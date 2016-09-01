var express = require('express');
var path = require('path');
var logger = require('bunyan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();


var config = require('../webpack.config');
var compiler = webpack(config);


app.use(express.static(path.join(__dirname, '../src/static/assets')));
// app.use(express.static(__dirname + '../src/static/img'));

app.use(webpackDevMiddleware(compiler));

app.use(webpackHotMiddleware(compiler));



// app.use(router);
//
app.get('*', function(req, res) {
    console.log("PATH:");
    console.log(path.join(__dirname, '../src/static/index.html'));
    res.sendFile(path.join(__dirname, '../src/static/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

module.exports = app;