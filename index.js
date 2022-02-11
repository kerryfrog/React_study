const express =require("express");
const app =express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kerryfrog:qwerty123@react.1nwxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=> console.log("mongoDb Connected..."))
  .catch(err =>console.log(err))

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, ()=> console.log(`Example app listening on port ${port}!` ))

