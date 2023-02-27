const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const app = express();
const port = 3000;
const mongoUri = 'mongodb://localhost:27017/myapp';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('myapp', userSchema);

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(users);
    }
  });
});


app.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  });
});

app.post('/users', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(user);
    }
  });
});

app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }, { new: true }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  });
});

app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
