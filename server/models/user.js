const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

//creating sechema for user
const userSechema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    cart:{
        type: Array,
        default: []
    },
    history:{
        type: Array,
        default: []
    },
    role:{
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

//before saving to the db, hash the password, (changed to ES5 cos ES6 won't work for some reason)
userSechema.pre('save', function(next) {
    var user =this;

    //isModified from mongo
    //check if the user is changing the password
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if(err) return next(err);
    
            //hasing the user password
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else{
        next()
    }
})

//creating function in userSechema
userSechema.methods.comparepassword = function(userPassword, cb) {
    bcrypt.compare(userPassword, this.password, (err,isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSechema.methods.generateToken = function(cb) {
    var user = this;
    
    // user.id + password of env-> generate token 
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)
    user.token = token;
    console.log('Generated token', user.token)
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

const User = mongoose.model('User', userSechema);

module.exports = {User}