const express=require('express');
const app=express();
const bodyparser=require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const mysql=require('mysql2');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:'node-complete',
    password: "Pjha@11810995"
  })


app.get('/booking',(req,res,next)=>{
  
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM user", function (err, result, fields) {
          if (err) throw err;
          else{
            
            res.json(result);

          }
          
        });
      });
})
app.post('/booking',(req,res,next)=>{
    
    console.log(req.body.name);

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO user (email, name ) VALUES ('${req.body.email}', '${req.body.name}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    res.status(200);
    res.redirect('/booking');

    

})

app.get('/booking/:id',(req,res,next)=>{

    console.log(req.params);
  
    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM user  WHERE id='${req.params.id}'`, function (err, result, fields) {
          if (err) throw err;
          else{
            
            res.json(result[0]);

          }
          
        });
      });
})

app.delete('/booking/:id',(req,res,next)=>{
    console.log(req.params);

    con.connect(function(err) {
        if (err) throw err;
        var sql = `DELETE FROM user WHERE id = '${req.params.id}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });
      res.status(200);
      res.redirect('/booking');
})


app.use((req,res,next)=>{
    res.send('hello');
})




app.listen(3000);
  





