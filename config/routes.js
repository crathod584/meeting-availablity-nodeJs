 /**Declare all routes file */
module.exports = function(app) {
    require('../modules/availability/addAvailability.route')(app);
    require('../modules/user/user.route')(app);
};