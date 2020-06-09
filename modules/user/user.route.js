const user = require('./user.controller');

module.exports = function(app) {

    /**Declare all routes file for User */
    app.post('/createUser',[user.createUser]);
    app.get('/getUser',[user.getUser]);
};