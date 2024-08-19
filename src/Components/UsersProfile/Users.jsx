import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Users.css'
import '../Profile.css'

const Users = () => {
    const token = Cookies.get("jwtToken");
  if(token === undefined){
    navigate("/")
  }
    const {username}=useParams();
    const [userData,setUserData]=useState(null)
    const [Npost ,setNpost]=useState(20)
    useEffect(()=>{
       async function fetching(){
        try{
            const data=await fetch(`https://apis.ccbp.in/insta-share/users/${username}`,{
                method: 'GET',
                headers:{
                  Authorization:`Bearer ${Cookies.get("jwtToken")}`,
          
                }
            })
            const k=await data.json();
            console.log(k)
            setUserData(k.user_details)
        }
        catch(error)
        {
         console.log("Error at fetching user data")
        }
       }
       fetching();
      
    },[username])
  return (
    <div>
      {userData?<div id="Profile">
            <div id="Profile-head">
                <div id="Profile-div1">
                <div id="Profile-Pic">
                   <img src={userData.profile_pic} alt="Profile"/>
                </div>
                </div>
                <div id="Profile-bio">

                    <div id="Profile-name">
                      <h4>{userData.user_name}</h4>
                    </div>
                    <div id="Profile-connections">
                        <div className='Person-status'><div><b>{userData.posts_count}</b>&nbsp;</div><div>Posts</div></div>
                        <div className='Person-status'><div><b>{userData.followers_count}</b>&nbsp;</div><div>followers</div></div>
                        <div className='Person-status'><div><b>{userData.following_count}</b>&nbsp;</div><div>following</div></div>
                    </div>
                    <div id="Profile-info">
                       <p>It's me {userData.user_name}</p>
                       <p>{userData.user_bio}
</p>
                    </div>
                </div>

            </div>
            <div id="Profile-highlights">
               {  ( userData.stories.map((item,ind)=>(
                        <div id='high-Pic' key={item.id}>
                             <div id='high-img'>
                                <img src={item.image}/>
                                </div>
                            </div>
                    )))}
    
            </div>
            <div id="Profile-posts">
                <div id="gallery-head"> 
                <i className="fas fa-bars"></i>&nbsp;
                <p>Posts</p>
                </div>
                
                <div id="Profile-gallery">
                    {
                       <div id="Profile-gallery">
                       {
                           Npost===0 ?(
                            <div id='no-posts'>
                                <img src='https://www.lovelearnings.com/wp-content/uploads/2020/05/no-posts-yet.png' alt='No Posts Yet' />
                            </div>
                        )  : (
                            userData.posts.map((item, ind) => (
                                <div key={item.id} id='each-post'>
                                    <img src={item.image} alt={`Post ${ind + 1}`} />
                                </div>
                            ))
                        )
                       }
                   </div>
                    }
                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            </div>

        </div>:<> <p>Loading...</p></>}
    </div>
  )
}

export default Users
