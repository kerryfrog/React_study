const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        maxlength:50
    },
    email:{
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type: String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role: {
        type:Number,
        default:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    //비밀번호가 변환될 때 마다. 
    if(user.isModified('password')){
        //비밀 번호를 암호화 시키는 부분 
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            //hash: 암호화된 비밀번호  
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
               // console.log("hash is ", hash);
                user.password = hash;
                next();
            })
        })
    } //end if
    else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plain password 와 암호화된 비밀번호가 같은지 체크해야함 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    //json webtoken을 이용하여 웹 토큰을 생성하기 
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function(err, decoded){
        //decoded 는 user id 가 나옴 
        //유저 아이디를 이용해서 유저를 찾은 다음
        // 클라이언트에서 가저온 token 과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token": token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        });
    })
}

const User = mongoose.model('User',userSchema);
module.exports ={User}