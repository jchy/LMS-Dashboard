const express = require('express');
const router = express.Router();

const Student= require("../models/student.model");

const protect = require('../middlewares/protect');

router.post('/students', async (req, res) => {
    try {
      const student = await Student.create(req.body);
      return res.status(201).json({ data: student });
    } catch (err) {
      return res.status(500).json({status: "failed", message: "Student is not created"});
    }
  });

router.get('/students', protect, async (req, res) => {
    const student = await Student.find({}).populate("user").lean().exec();
    return res.status(200).json({ data : student });
})

module.exports = router;