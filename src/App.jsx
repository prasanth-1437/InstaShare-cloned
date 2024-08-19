import React, { useContext } from "react";
import { Login } from "./Components/Login";
import './App.css'
import Home from "./Components/Home";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Profile } from "./Components/Profile";
import { PageNotFound } from "./Components/PageNotFound";
import { SignUp } from "./Components/SingUp/SignUp";
import { UserContext, UserProvider } from './UserContext';
import Users from "./Components/UsersProfile/Users";
const App=()=>{
  const {userInfo,updateUserField}=useContext(UserContext);
  return(
  
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login />} />
          <Route  path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/profile/:username" element={<Users/>} /> 
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
