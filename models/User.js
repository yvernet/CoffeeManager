/**
 * Created by Yann on 08/03/2015.
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : String,
    password : String,
    favDrink : String
})

userSchema.methods.validPassword = function(password){
    return (password == this.password);
}

module.exports = mongoose.model('User', userSchema);
