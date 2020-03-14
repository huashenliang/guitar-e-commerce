const express = require('express');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//Models
const {User} = require('./models/user');
const {Brand} = require('./models/brand');

//middlewares
const {auth} = require('./middleware/auth');
const {admin} = require('./middleware/admin');

const app = express();

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE)

//register middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookiParser());


//---------------------------
//Brand
//---------------------------
app.post('/api/product/brand', auth, admin, (req,res) => {
    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if(err) return res.json({success: false,err});
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})

app.get('/api/product/getbrands', (req,res) => {
    Brand.find({}, (err, brands) => {
        if(err) return res.status(400).send(err)
        res.status(200).send(brands)

    })
})




//---------------------------
//USERS
//---------------------------

//check for auth
app.get('/api/users/auth', auth, (req,res) => {
    //these data will be used later for the react part
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})


//register a user
app.post('/api/users/register', (req,res) => {
    const user = new User(req.body);


    //saving to mongodb
    user.save((err, doc) => {
        if(err) return res.json({success:false,err})   
        res.status(200).json({
            success:true
        })
     })

})

//user login
app.post('/api/users/login',(req,res) => {

    //find the email
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({loginSucess: false, message:'Auth failed, email not found'})

        //check password
        user.comparepassword(req.body.password, (err, isMatch)=> {
            if(!isMatch) return res.json({loginSucess: false, message:'Wrong password!'})

            //generate a token
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSucess: true
                })
            })
        })
    })
})


//User logout
//the user can only log out if they are authenticated
app.get('/api/user/logout', auth, (req,res) => {
    
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err,doc)=>{
            if(err) return res.json({success:false,err})
            return res.status(200).send({
                success:true
            })
        }
    )
})





const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`server running at ${port}`)
})