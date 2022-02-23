const express = require('express');
const router = express.Router();

const Lecture= require("../models/lecture.model");
const User= require("../models/user.model");

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
        const validateUser = await User.findOne({ _id: req.body.author_id }, {_id:0,roles:1});
        let authenicated = false;
        let roles = validateUser.roles;
        for(let i=0;i<roles.length;i++){
            if(roles[i]==='instructor' || roles[i]==='admin'){
                authenicated = true;
                break;
            }
        }
        if(authenicated){
                const lecture = await Lecture.findOneAndDelete({ _id: req.params.lecture_id })
                if(!lecture) return res.status(404).json({msg: "Lecture not found"})
                res.status(200).json(lecture)
            }
        else{
            return res.status(404).json({msg: "You are noth authorized to delete the lecture"});
        }
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
});


router.patch('/lectures/:lecture_id' ,async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "Title is required"});
        const validateUser = await User.findOne({ _id: req.body.author_id }, {_id:0,roles:1});
        let authenicated = false;
        let roles = validateUser.roles;
        for(let i=0;i<roles.length;i++){
            if(roles[i]==='instructor' || roles[i]==='admin'){
                authenicated = true;
                break;
            }
        }
        if(authenicated){
                const lecture = await Lecture.findOneAndUpdate({ 
                    _id: req.params.lecture_id
                },{
                    $set: {
                        title: req.body.title,
                        batch: req.body.batch
                    }
                },{
                    returnOriginal: false
                })
                if(!lecture) return res.status(404).json({msg: "Lecture not found"})
                    res.status(200).json(lecture)
        }
        else{
            return res.status(404).json({msg: "Forbidden you are not authorized to Update the leacture content"});
        }
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