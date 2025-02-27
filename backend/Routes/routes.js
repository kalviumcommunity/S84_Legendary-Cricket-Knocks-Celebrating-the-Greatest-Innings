const express = require('express');
const Inning = require('../Models/userModel');
const router = express.Router();

router.use(express.json());

router.post('/innings', async(req, res) => {

    const {playerName, Runs, Balls, Country, Opponent} = req.body;

    if(!playerName || (!Runs && !Balls) || !Country || !Opponent){

        return res.status(400).json({message: `playerName, Runs, Balls, Country, Opponent is required`})
    }
        try{
            
            const newInnings = new Inning({playerName, Runs, Balls, Country, Opponent});
            await newInnings.save();
            
            res.status(201).json({message: `Created Successfully`, inning: newInnings})
        }
        catch(err){
            res.status(500).json({message: `Bad Request`})
        } 
    });
        


router.get('/innings', async(req, res) => {
    try{
        const mom = await Inning.find();
        res.json(mom);
    } catch(err){
        console.log(`You are facing and error ${err}`)
    }
});

router.get('/innings/:id', async(req,res) =>{
    try{
        const idInning = await Inning.findById(req.params.id);

        if(!idInning){
            return res.status(404).json({message: `Error 404 Innings not found!`})
        }
        res.json(idInning);
    } catch(err){
        res.status(400).json({message: `Bad request`, err})
    }
});

router.put('/innings/:id',async(req,res) => {
    try{
        const {playerName, Runs, Balls, Country, Opponent} = req.body;

        const updateInning = await Inning.findByIdAndUpdate(req.params.id, {playerName, Runs, Balls, Country, Opponent}, {new: true})

        if(!updateInning){
            return res.status(404).json({message: `Innings not found`});
        }

        res.status(200).json({message: `Updated Succesfully`, Inning: updateInning})

    } catch(err) {
        return res.status(500).json({message : `Internal server error`})
    }
});

router.delete('/innings/:id', async(req, res) => {
    try{
        const delInning = await Inning.findByIdAndDelete(req.params.id);

        if(!delInning){
            return res.status(404).json({message: `Inning not found`});
        }
        res.status(200).json({message: `Inning deleted successfully`})
    } catch(err){
        res.status(500).json({message: `Internal server error`})
    }
});

module.exports = router