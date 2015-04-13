var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

/* GET home page. */
router.post('/', function(req, res, next) {
    // retrieve parameter login / password
    var userLogin = req.body.login;
    var userPassword = req.body.password;

    if(!userLogin || !userPassword){
        res.status(401).json({message : "Missing credentials"});
    }else{
        // Search if the user exists
        User.findOne({name : userLogin, password : userPassword}, function(err, user){

            if (err) return next(err);

            if (!user){
                // if not, unauthorized response
                res.status(401).json({message : "User not authorized"});
            }else{
                console.log(user);
                // if yes, generate a token and send it back to the requester with useful user info
                var token = "fehrzumfhrzulfhmu";
                var resultUser = {};
                resultUser.id = user._id;
                resultUser.name = user.name;
                resultUser.email = user.email;
                resultUser.favDrink = user.favDrink;
                resultUser.token = token;

                console.log(resultUser);

                res.json(resultUser);
            }

        });
    }


});

module.exports = router;
