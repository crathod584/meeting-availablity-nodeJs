const addAvailabilityCtrl = require('./addAvailability.controller');

/**
* @param app
* @desc Declare all routes file for availability
*/
module.exports = function(app) {
    app.post('/addAvailability',[addAvailabilityCtrl.addUserAvailability]);
    app.get('/getAvailability',[addAvailabilityCtrl.getUserAvailability]);
};