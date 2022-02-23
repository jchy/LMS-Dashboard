const express = require('express');
const router = express.Router();

const Lecture= require("../models/lecture.model");

const protect = require('../middlewares/protect');

router.post('/lectures', async (req, res) => {
    try {
      const lecture = await Lecture.create(req.body);
      return res.status(201).json({ data: lecture });
    } catch (err) {
      return res.status(500).json({status: "failed", message: "lecture is not created"});
    }
  });

router.get('/lectures', protect, async (req, res) => {
    const lecture = await Lecture.find({}).populate("author_id").lean().exec();
    return res.status(200).json({ data : lecture });
});

router.delete('/lectures/:lecture_id', async (req,res)=>{
    try{
        const lecture = await Lecture.findOneAndDelete({ _id: req.params.lecture_id })
        if(!lecture) return res.status(404).json({msg: "Lecture not found"})
        res.status(200).json(lecture)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
});


router.patch('/lectures/:lecture_id' ,async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "Name is required"});
        const lecture = await Lecture.findOneAndUpdate({ 
            _id: req.params.lecture_id
        },{
            $set: {
                title: req.body.title,
                batch: req.body.batch
            }
        },{
            returnOriginal: false
        }
        )
        if(!lecture) return res.status(404).json({msg: "Lecture not found"})
        res.status(200).json(lecture)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
});

router.get('/lectures/:id', async (req,res)=>{
    try{
        const lecture = await Lecture.findOne({ _id: req.params.lecture_id })
        if(!lecture) return res.status(404).json({msg: "Lecture not found"})
        res.status(200).json(lecture)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
});

module.exports = router;