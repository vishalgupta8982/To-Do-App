const express = require('express');
const User = require('../models/ToDoSchema');
const router = express.Router();

router.post('/', async (req, res) => {
  const {item} = req.body;
  const newItem = new User({item});
  try {
    const savedItem = await newItem.save();
    res.status(200).send({success: true});
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
