require('dotenv').config();
const express = require('express');
const auth = require('./src/middlewares/auth');
const bcrypt = require('bcrypt');
require('./src/db/conn');
const Register = require('./src/models/register');
const app = express('app');
const hbs = require('hbs');
const port = process.env.PORT || 8004;
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const template_path = path.join(__dirname, './templates/views');
const partials_path = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const registerUser = new Register({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
            aadhar: req.body.aadhar,
        });

        const userExist = await Register.findOne({ aadhar: registerUser.aadhar });
        if (userExist) {
            res.status(422).json({ error: 'User already exists' });
        } else {
            const token = await registerUser.generateAuthToken();
            const registered = await registerUser.save();
            console.alert('User Created Successfully');
            res.status(200).json({ message: 'Registered Successfully' });
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).send('user already exists with these credentials');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const aadhar = req.body.aadhar;
        const password = req.body.password;
        const user = await Register.findOne({ aadhar: aadhar });
        const isMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken();
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 600000),
            httpOnly: true,
        });
        if (isMatch) {
            console.log('Login Successful');
            res.status(200).json({ message: "Logged in" }); // Sending JSON response
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: 'Error logging in' }); // Sending JSON error response
    }
});

app.get('/home', async (req, res) => {
    try {
        const total = await Register.find({ voteStatus: true }).count();
        const bjp = await Register.find({ voted: { $elemMatch: { party: 'bjp' } } }).count();
        const congress = await Register.find({ voted: { $elemMatch: { party: 'congress' } } }).count();
        const aap = await Register.find({ voted: { $elemMatch: { party: 'aap' } } }).count();
        const ncp = await Register.find({ voted: { $elemMatch: { party: 'ncp' } } }).count();
        const inld = await Register.find({ voted: { $elemMatch: { party: 'inld' } } }).count();
        const nota = await Register.find({ voted: { $elemMatch: { party: 'nota' } } }).count();
        res.status(200).json({ total, bjp, congress, aap, ncp, inld,nota });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Error fetching data');
    }
});

app.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        res.clearCookie('jwt');
        await req.user.save();
        res.status(200).send('Logged out successfully');
    } catch (e) {
        res.status(404).send('Login to access this page');
    }
});
app.post('/voterecording', auth, async (req, res) => {
    try {
        const aadhar = req.body.aadhar;
        const password = req.body.password;
        const user = await Register.findOne({ aadhar: aadhar });
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            if (user.voted.length !== 1) {
                const registerVote = user.voting(req.body.party);
                console.log('Vote recorded successfully');
                res.send('Vote recorded');
            } else {
                console.log('Already voted');
                res.status(400).send('Already voted');
            }
        }
    } catch (e) {
        console.log('Error recording vote');
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`); // Use backticks and template literals
});
