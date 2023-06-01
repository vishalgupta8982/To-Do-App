const express = require("express")
const User = require('../models/ToDoSchema');
const router = express.Router();

router.delete("/", async(req,res)=>{

    const {item} = req.body;
    try {
        const result = await User.deleteOne({item});
        if (result) {
            res.send({success:true})
        }

        else {
            res.status(404).send({error:"item not found"})
        }
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }

})

module.exports = router;