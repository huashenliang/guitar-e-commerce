const express =require('express');
const bodyParser = require('body-parser');
const cookiParser =require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const {User} =require('./models/user');



const app = express();

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE)

//register middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookiParser());


//Models


//USERS
app.post('/api/users/register', (req,res) => {
    const user = new User(req.body);


    //saving to mongodb
    user.save((err, doc) => {
        if(err) return res.json({success:false,err})   
        res.status(200).json({
            success:true,
            userData:doc
        })
     })

})



const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`server running at ${port}`)
})