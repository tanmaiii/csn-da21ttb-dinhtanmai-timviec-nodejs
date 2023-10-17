import express from 'express';
import { db } from "./connect.js";

const app = express();

db.connect(function(err){
    if(err) {
        console.log("Error connecting SQL " + err.stack)
    }else{
        console.log("Connecting mysql");
    }
})

app.listen(8800, (req,res) => {
    console.log("Backend running");
})