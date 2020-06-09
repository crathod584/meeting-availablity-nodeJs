const User = require('./model/user.model').User;

/**
* @method createUser
* @param req
* @param res
* @desc Create a new user
*/
exports.createUser = (req,res) => {
    if(req.body){
        const createUser = new User(req.body);
        return createUser.save().then((result) => {
            res.status(201).send(result);
        },err => res.status(err.status).send(err));    
    }else{
        res.json({ status: "failed", message: "Enable to create User" });
    }
    
};

/**
* @method getUser
* @param req
* @param res
* @desc Get all the User
*/
exports.getUser = (req, res) => {
    User.find({}).exec((err, result) => {
        if (err)
            res.status(err.status).send(err)
        else
        res.status(200).send(result)
    });
  };