var mosca = require('mosca');

var pubsubsettings = {
    type: 'mqtt',
    json: true,
    mqtt: require('mqtt'),
    host: '172.31.46.231',
    port: 1883
};


var server = new mosca.Server(pubsubsettings);

var authenticate = function(client, username, password, callback) {
    var authorized = (username === 'alice' && password.toString() === 'secret');
    if (authorized) client.user = username;
    callback(null, authorized);
  }
  var authorizePublish = function(client, topic, payload, callback) {
    callback(null, client.user == topic.split('/')[1]);
  }
  var authorizeSubscribe = function(client,topic, callback) {
    callback(null, client.user == topic.split('/')[1]);
  }
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
}

exports.brokerstart = function(req, res)
{
    server.on('clientConnected', function(client) {
        console.log('client connected', client.id);
    });
    server.on('published', function(packet, client) {      
    });
    server.on('ready', setup);
};
exports.start = function(req,res){
  res.render('index');
}