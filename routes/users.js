// API for users //

var User = require('../models/User.js');

module.exports = function (router, passport) {


    /* GET /users listing. */
    router.get('/',
        //passport.authenticate('basic', { session: false }),
        function(req, res, next) {
            User.find(function (err, users){
                if(err) return next(err);
                console.log(users);
                res.json(users);
            })
        }
    );

    /* POST /users */
    router.post('/', function(req, res, next) {
        User.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    /* GET /users/id */
    router.get('/:id', function(req, res, next) {
        User.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    /* PUT /users/:id */
    router.put('/:id', function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    /* DELETE /users/:id */
    router.delete('/:id', function(req, res, next) {
        User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

}



