const express = require('express');
const connect = require('./src/config/db');

const PORT = 3000;

const app = express();
app.use(express.json());

const {signup , signin} = require('./src/controllers/auth.controller');
const userController = require('./src/controllers/user.controller');
const lectureController = require('./src/controllers/lecture.controller');
const studentController = require('./src/controllers/student.controller');


app.post("/signup", signup);
app.post("/signin", signin);

app.use("/users", userController);
app.use("/lectures", lectureController);
app.use("/students", studentController);



const start = async () => {
    await connect();
    
    app.listen(PORT, () =>{
        console.log(`Listening on port ${PORT}`);
    })
}
module.exports =start;