/**
 * Created by Yann on 22/03/2015.
 */
var BasicStrategy = require('passport-http').BasicStrategy;

var User = require('../models/User.js');

module.exports = function(passport){

    passport.use(new BasicStrategy(
        function(username, password, done) {
            console.log('username : ' + username);
            User.findOne({name : username}, function(err, user){
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                if (!user.validPassword(password)) {
                    console.log('Invalid password');
                    return done(null, false);
                }
                console.log('USER' + user);
                return done(null, user);
            });

        }
    ));

}


