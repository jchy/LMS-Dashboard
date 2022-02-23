const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const lectureSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author_id : {
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

const Lecture = mongoose.model('lecture', lectureSchema);

module.exports = Lecture;