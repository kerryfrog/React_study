const express =require("express");
const app =express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key'); 

const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
}).then(()=> console.log("mongoDb Connected..."))
  .catch(err =>console.log(err))

app.get('/', (req, res) => res.send('아아 테스트중이요소잉'));

app.post('/register', (req, res) => {
  // 회원강비할 때 필요한 정보들을 client에서 가져오면 
  //그 정보를 데이터베이스에 넣어줌 
  const user = new User(req.body);
  //mongodb method
  user.save((err ,userInfo) => {
    if(err) return res.json({sucess:false ,err});
    return res.status(200).json({
      success:true
    })
  })

})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!` ))

