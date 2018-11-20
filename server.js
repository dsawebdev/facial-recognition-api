const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
  users: [
    {
      id: '1234',
      name: 'Devon',
      email: 'dvonanderson@yahoo.com',
      password: 'rylee',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1254',
      name: 'Courtney',
      email: 'courtney@yahoo.com',
      password: 'adgell',
      entries: 0,
      joined: new Date()
    }
  ],
}

//? Root
app.get('/', (req, res) => {
  res.send(database.users)
})

//? Signin Endpoint
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error loggin in');
  }
});

//? Post Endpoint
app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
  });
  database.users.push({
    id: '',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
});

//? Profile Endpoint
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if(!found) {
    res.status(400).json('no such user exist')
  }
});

//?Image endpoint
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    } 
  })
  if(!found) {
    res.status(400).json('user not found')
  }
});


// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });


app.listen(3000, () => {
  console.log('App is running on port 3000')
})
