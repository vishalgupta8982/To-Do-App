 const express = require('express');
 const User = require('../models/ToDoSchema');
 const router = express.Router();

 router.get('/', async (req, res) => {
   try {
     const data = await User.find({});
     res.json(data);
   } catch (err) {
     console.error('Error retrieving documents', err);
     res.status(500).json({message: 'Internal server error'});
   }
 });

 module.exports = router;
