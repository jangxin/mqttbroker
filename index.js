var http = require("http");
var url = require("url");
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var port = normalizePort(process.env.PORT || 8003);


var controller = require('./controller/controller.js');
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
require('./route/route')(app);
app.engine('.html',require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res,next){
    res.redirect('/index');
})
app.use(function(req,res,next){
    // next();
    res.redirect('/index');

});
controller.brokerstart();
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
    throw error;
    }
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening(req, res) {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);  
}


function parseJSONorNot(mayBeJSON) {
	if (typeof mayBeJSON === 'string') {
		return JSON.parse(mayBeJSON);
	} else {
		return mayBeJSON;
	}
}
module.exports = app;
