const express = require('express');
const Joi = require('joi');
// const router = express.Router();
const router = express();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

const db = require('../db');
// const messages = db.get('messages');

const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: "String",
    message: "String",
    latitude: "Number",
    longitude: "Number",
    date: "Date"
})

const messages = mongoose.model('messages', schema, 'messages');

const schemav = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9À-ž -_]{1,100}$/).required(),
    message: Joi.string().min(1).max(500).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});


router.get('/', async (req, res) => {
    try{
        const listings = await messages.find();
        res.send(listings);
    } catch(error) {
        res.status(500).send(error);
    }

    // messages.find().then(
    //     (allMessages) => {
    //         res.json(allMessages);
    //     },
    //     (error) => { res.json(error) }
    // );
    
});

router.post('/', async (req, res) => {
    //console.log(req.body);
    const result = schemav.validate(req.body);
    console.log(result);
    if(typeof result.error === 'undefined' || result.error === null ) {
        const {name,message,latitude,longitude }  = req.body;
        const userMessage ={
            name,
            message,
            latitude,
            longitude,
            date: new Date()
        }
        try{
            const newMessage = await messages.create(userMessage);
            res.json(newMessage);
        } catch(error){
            res.send(error);
        }
        
        //insert into DB
        //add current time
        // messages.insert(userMessage)
        // .then(insertedMeassges=> {
        //     res.json(insertedMeassges);
        // })
    } 
});

module.exports = router;
