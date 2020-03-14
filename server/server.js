const express =require('express');
const bodyParser = require('body-parser');
const cookiParser =require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE)

//register middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookiParser());


//USERS
app.post('/api/users/register', (req,res) => {
    res.send(200);
})



const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`server running at ${port}`)
})