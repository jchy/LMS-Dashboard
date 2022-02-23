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
})

module.exports = router;