const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'padma',
    database: 'studentinfo'

});

db.connect(function(err){
    if(err){
        console.log(err);
    }
    console.log("Database connected!");
});

//get data-all students
app.get('/details',(req,res)=>{
    let qr = 'SELECT * FROM student;'
    db.query(qr,(err,result)=>{
        if (err){
            console.log("errs",err);
        }
        if(result.length>0){
            res.send({
                message: "all user data",
                data: result
            });}
        else{
            res.send({message: "No data"});
        }
    });
});

app.get('/details/null',(req,res)=>{
    let qr = 'SELECT * FROM student;'
    db.query(qr,(err,result)=>{
        if (err){
            console.log("errs",err);
        }
        if(result.length>0){
            res.send({
                message: "all user data",
                data: result
            });}
        else{
            res.send({message: "No data"});
        }
    });
});

//get single student
app.get('/details/:id',(req,res)=>{
    let gid = parseInt(req.params.id);
    let qr = 'SELECT * FROM student WHERE studid = ?';

    db.query(qr,gid,(err,result)=>{
        if(err){console.log("err",err);}
        if (result.length>0){
            res.send({
                message: "details of single student",
                data: result
            });
        }
        else{
            res.send({
                message: "Data not found"
            });
        }
    })
})

//Create a student
app.post("/details",(req,res)=>{
    console.log(req.body,'createdata');

    let studid = 0;
    let fullname = req.body.fullname;
    let address = req.body.address;
    let phoneNO = req.body.phoneno;
    let qr = "CALL `studentinfo`.`StudAddandEdit`(?,?,?,?);";

    db.query(qr,[studid,fullname,address,phoneNO],(err,result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message: "Data inserted"
            });
        }
        else{
            res.send({
                message: "wrong..."
            });   
        }
    });
});

//update data
app.put("/details/:id",(req,res)=>{
    console.log(req.body,'createdata');

    let studid = parseInt(req.params.id);
    let fullname = req.body.fullname;
    let address = req.body.address;
    let phoneNO = req.body.phoneno;
    let qr = "CALL `studentinfo`.`StudAddandEdit`(?,?,?,?);";

    db.query(qr,[studid,fullname,address,phoneNO],(err,result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message: "Data updated"
            });
        }
        else{
            res.send({
                message: "wrong..."
            });   
        }
    });
});

//Delete single data
app.delete("/details/:id",(req,res)=>{
    let qid = req.params.id;
    let qr = "DELETE FROM student WHERE studid = ?;"

    db.query(qr,[qid],(err,result)=>{
        if(err){console.log("err",err);}
        if(result){
            res.send({
                message: "Deleted succesfully"
            });
        }
    });
});

//delete all data
app.delete("/details",(req,res)=>{
    let qr = "DELETE FROM student;"

    db.query(qr,(err,result)=>{
        if(err){console.log("err",err);}
        res.send({
            message: "Deleted succesfully"
        });
    });
});

app.listen(3000,()=>{
    console.log("server running...");
});
