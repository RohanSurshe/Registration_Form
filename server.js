// For MongoDB Compass first we have to install packages  - express & mongoose
// npm i express
// npm i mongoose

// calling on localhost
const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/form.html');
});

app.get('/login',(req,res) => {
    res.sendFile(__dirname ,'/login.html');
});

//Sserver Start
app.listen(8080,() => {
    console.log("started");
});

//Connect with mongoDb
app.use(express.urlencoded({ extended : true }));

mongoose.connect('mongodb://localhost:27017/registrationform',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Not Connected to MongoDB',err));

const userSchema = new mongoose.Schema({
    name : String,
    mail : String,
    Password : String,
});

const User = mongoose.model('user',userSchema);

app.post('/Register', (req,res) => {
    const { name, mail, Password } = req.body;

    const newUser = new  User({
        name,
        mail,
        Password,
    });

    newUser.save()
        .then(() => res.send('Registration Successfull'))
        .catch(err => res.status(500).send('Error registering user : ' + err.message));
});

//Login form
app.post('/login', async(req,res) => {
    const { mail, Password } = req.body;

    try {
        const user = await user.findOne({ mail, Password});

        if(user) {
            res.send(`Welcome back ${user.username}`);
        }else{
            res.status(401).send('Invalid email or password');
        }
    } catch(err){
        res.status(500).send('Error logging in : ' + err.message);
    }
});


