/**
 * Created by Yann on 08/03/2015.
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : String,
    favDrink : String
})

module.exports = mongoose.model('User', userSchema);
