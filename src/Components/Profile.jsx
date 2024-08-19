
import { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar'
import './Profile.css'
import prasanth from '../assets/prasanth.jpg'
import { UserContext } from '../UserContext';
import Cookies from 'js-cookie';

export const Profile=()=>{
    const token = Cookies.get("jwtToken");

  if(token === undefined){
    navigate("/")
  }
    const [noPosts ,setNoPosts]=useState(false)
    const [Npost ,setNpost]=useState(20)
    const {userInfo, updateUserField} =useContext(UserContext);
    const [profData,setProf]=useState(null)
    const handleNpost=()=>{
        if(Npost==0)
        {
            setNpost(20)
        }
        else{
            setNpost(0)
        }
    }
    useEffect(()=>{
        async function callMe(){
            try{
            const response=await fetch("https://apis.ccbp.in/insta-share/my-profile",{method:'GET' , headers:{Authorization: `Bearer ${Cookies.get('jwtToken')}`}})
            const {profile}=await response.json()
             console.log("Profile:-",profile)
             setProf(profile)
        }
        catch(error)
        {
            console.log("error -",error)
        }} 
        callMe();
    },[])
    useEffect(()=>{
        try{console.log("update ",profData)
        console.log(profData.user_name)}
        catch(rr){
            console.log("errorr",rr)
        }
    },[profData])
    return(
        <>
        <Navbar/>
        {profData?<div id="Profile">
            <div id="Profile-head">
                <div id="Profile-div1">
                <div id="Profile-Pic">
                   <img src={profData.profile_pic} alt="Profile"/>
                </div>
                </div>
                <div id="Profile-bio">

                    <div id="Profile-name">
                      <h4>{profData.user_name}</h4>
                    </div>
                    <div id="Profile-connections">
                        <div className='Person-status'><div onClick={()=>handleNpost()}><b>{profData.posts_count}</b>&nbsp;</div><div>Posts</div></div>
                        <div className='Person-status'><div><b>{profData.followers_count}</b>&nbsp;</div><div>followers</div></div>
                        <div className='Person-status'><div><b>{profData.following_count}</b>&nbsp;</div><div>following</div></div>
                    </div>
                    <div id="Profile-info">
                       <p>It's me {profData.user_name}</p>
                       <p>{profData.user_bio}
</p>
                    </div>
                </div>

            </div>
            <div id="Profile-highlights">
               {  ( profData.stories.map((item,ind)=>(
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
                            profData.posts.map((item, ind) => (
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

        </div>:(
      <p>Loading...</p>
    )}
        </>
    )
}