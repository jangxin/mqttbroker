var controller = require('../controller/controller.js');
module.exports = function(app) {
    app.get('/startborker',controller.brokerstart);
    app.get('/index',controller.start);
};