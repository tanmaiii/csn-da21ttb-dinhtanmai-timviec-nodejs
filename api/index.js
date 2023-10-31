import express from 'express';
import { db } from "./config/connect.js";
import authUserRouter from './routers/authUser.router.js'
import usersRouter from './routers/users.router.js'

const app = express();

app.use(express.json())

db.connect(function(err){
    if(err) {
        console.log("Error connecting SQL " + err.stack)
    }else{
        console.log("Connecting mysql");
    }
})

app.use("/api/authUser", authUserRouter)
app.use("/api/user", usersRouter)

app.listen(8800, (req,res) => {
    console.log("Backend running");
})

