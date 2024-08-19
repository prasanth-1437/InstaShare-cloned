import { useContext, useState } from 'react'
import './Login.css'
import logo from '../assets/Standard Collection 8.png'
import photo from '../assets/Illustration.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Cookies from 'js-cookie';
export const Login=()=>{
    const [err,setError]=useState("")
    const [email,setUser]=useState('')
    const [pswd,setPswd]=useState('')
    const [Login ,setLogin]=useState(false);
    const {userInfo, updateUserField }=useContext(UserContext);
    const navigate=useNavigate();
    var cred=[{  username: 'aakash',
        password: 'sky@007'},
        {  username: 'agastya',
            password: 'myth#789'},
            {
              "username": "rahul",
              "password": "rahul@2021"
            }
    ]
    const handleLogin=async()=>{
   
        try{
          var f=0;
          
          for(let i=0;i<cred.length;i++)
          {
          
            if(cred[i].username===email && cred[i].password===pswd)
            {
                console.log(email,pswd)
                const response = await fetch('https://apis.ccbp.in/login', {
                  method: 'POST',
                  
                  body: JSON.stringify({ username:email,  
                    password:pswd }),
                });
                const data = await response.json();
                console.log(data.jwt_token)
                Cookies.set("jwtToken", data.jwt_token)
                // updateUserField('email',email)
                // updateUserField('Login',true)
              navigate('/Home');
              console.log("ok with login")
              f=1;
              break;
            }
          }
          if(f===0)
          {
            setError("Invalid Password or username")
          }
        }
        catch(error){
               console.log("Error at Login",error)
        }

        
    }

    return(
        <div id="Login-page">
            <div id="Login-sidePic">
             <img src={photo}/>
            </div>
            <div id="Login-form">
                <div id="Login">
                    <img src={logo} />
                    <h3>Insta Share</h3>
                    <h6>USERNAME</h6>
                    <input type="email" name="email" value={email} onChange={(e)=>{setUser(e.target.value)}}/>
                    <h6>PASSWORD</h6>
                    <input type="password" name="pswd" value={pswd} onChange={(e)=>{setPswd(e.target.value)}}/>
                    <button onClick={handleLogin}>Login</button>
                   { err && (<p className='invalid-msg'>{err}</p>)}
                </div>
            </div>
        </div>
    )
}