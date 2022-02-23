const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const studentSchema = new mongoose.Schema({
    roll_number: {type: String, required: true, unique: true},
    user : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User',
       required : true
    },
    batch: {type: String, required: true},
    },
    {
        timestamps: { created_at: () => Date.now()
    }
   
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;