import { Axios } from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../../_actions/user_action'


export default function LoginPage() {
  const dispath = useDispatch();
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")

  const onEmailHandler =(event) =>{
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler =(event) =>{
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);
    //현재 클라이언트에서 서버에 보낼 값을 가지고 있음 
    let body = {
      email: Email,
      password :Password
    }
    dispath(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        navigate("/");
      }else {
        alert("로그인 실패");
      }
    })
  }

  return (
    <div style={{ display:'flex', justifyContent:"center",
    alignItems:"center", width: "100%", height:"100vh"
    }}>
      <form style={{display:"flex", flexDirection:"column"}}
        onSubmit ={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button type="submit">
          Login
        </button>

      </form>
    </div>
  )
}
