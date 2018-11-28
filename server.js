//Vendor
const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

//! Bring in endpoints
const register = require('./controllers/Register')
const signIn = require('./controllers/SignIn')
const profile = require('./controllers/Profile')
const image = require('./controllers/Image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'dsa',
    password : '',
    database : 'facial-recognition'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

//? Root
app.get('/', (req, res) => { res.send('it works') })

//? Signin Endpoint
app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });

//? Register Endpoint
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//? Profile Endpoint
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

//?Image endpoint
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//?Image Api
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => { console.log(`App is running on ${process.env.PORT}`) })
