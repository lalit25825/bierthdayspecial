const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

require('dotenv').config();               // 1. load .env
const mongoose = require('mongoose');     // 2. import mongoose
mongoose.connect(process.env.MONGO_URL);  // 3. then connect

const express = require('express');
// ... rest of your code




app.set('view engine',"ejs");
app.set("views", path.join(__dirname,"views"));
// Add this before your routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('index',{error:null});
})



app.post('/create',function(req,res){
    let{username,email,password}=req.body ;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createdUser = await userModel.create({
                username,
                email,
                password:hash,
            })

            let token = jwt.sign({username}, 'coco');
            res.cookie('token',token);
            res.redirect('/')
        })
    })


    
});

app.get('/login',function(req,res){
    res.render('birthday');
})

app.post('/login', async function(req, res) {
    let user = await userModel.findOne({ username: req.body.username });

    if (!user) return res.render('index', { error: "Username is incorrect" });

    bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result) {
            let token = jwt.sign({ username: user.username }, 'coco');
            res.cookie('token', token);
            res.render('birthday', { username: user.username });
        } else {
            return res.render('index', { error: "Password is incorrect" });
        }
    });
});


app.get('/logout',function(req,res){
    res.cookie('token',"");
    res.redirect('/');
})



app.listen(process.env.PORT || 3000);

