const User = require('../models/user');
const mongoose = require('mongoose');

function addUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.status(404).json({ success: false, message: 'invlid field' });

  const user = new User({
    username: username,
    password: password,
  });
  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(err.status).json({ success: true, message: err.message });
    });
}

function findAll(req, res) {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.status).json({ success: false, message: err.message });
    });
}

function findById(req, res) {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findById(id)
      .then((result) => {
        if (!result) return res.status(404).json({ success: false, message: `id: ${id} not found ` });
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      });
  } else {
    res.status(400).json({ success: false, message: 'please provide a valid id' });
  }
}

function update(req, res) {
  const id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;

  if (!id || !username || !password) return res.status(400).json({ message: 'invalid field' });

  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findByIdAndUpdate(id, { $set: { username: username, password: password } }, { new: true })
      .then((result) => {
        if (!result) return res.status(404).json({ success: false, message: `id: ${id} not exists` });
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      });
  } else {
    res.status(400).json({ success: false, message: 'please provide a valid id' });
  }
}

function deleteById(req, res) {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findByIdAndRemove(id)
      .then((result) => {
        if (!result) return res.status(404).json({ success: false, message: `id: ${id} not exists` });
        res.json({ success: true, message: 'delete successful' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
      });
  } else {
    res.status(404).json({ success: false, message: 'please provide a valid id' });
  }
}

module.exports = { addUser, findAll, findById, update, deleteById };
