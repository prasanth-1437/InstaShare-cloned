import React, { useContext, useEffect, useState } from 'react';
import './Home.css'; // Your custom CSS file
import './cmt.css'
import { Navbar } from './Navbar';
import like from '../assets/Likebtn.png';
import comment from '../assets/Comment.png';
import share from '../assets/share.png';
import liked from '../assets/Liked.png';
import NoResultsFound from '../assets/NoResultsFound.png';
import spin from '../assets/Rolling.png'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const StoryPreview = () => {
   const [likebtn,setLike]=useState(false)
   const [searchData, setSearchData] = useState('');
   const [spinner,setSpinner] =useState(true)
   const [count,setCount]=useState(0)
   const [cmtbtn ,setComment]=useState(false)
   var [d,setD]=useState(null)
   var [Posts,setPost]=useState(null)
   const [activeCommentPostId, setActiveCommentPostId] = useState(null);
   const [activeLike,setActiveLikeId]=useState(null)
   const [Post, setPosts] = useState(Posts);

   const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null); // Close the comment section if it's already open
    } else {
      setActiveCommentPostId(postId); // Open the comment section for the selected post
    }
  };

  const navigate = useNavigate();

  const token = Cookies.get("jwtToken");

  if(token === undefined){
    navigate("/")
  }
  

//    useEffect(()=>{
//     setTimeout(()=>{
//           setSpinner(false)
//     },3000)
//    },[])

async function apiCall() {
    setSpinner(true)
    try{
        const rew=await fetch("https://apis.ccbp.in/insta-share/stories",{
            method: 'GET',
            headers:{
              Authorization:`Bearer ${Cookies.get("jwtToken")}`,
      
            }})
        const k = await rew.json()
            setD(k);
            setSpinner(false)

        console.log("Stroires",k)
      }
      catch(error)
      {
        console.log("Err1",error)
      }

      try{
        const rew=await fetch("https://apis.ccbp.in/insta-share/posts",{
            method: 'GET',
            headers:{
              Authorization:`Bearer ${Cookies.get("jwtToken")}`,
      
            }})
        const k = await rew.json()
        console.log("try block1:-",k.posts)
     
            setPost(k)
          
        
      }
      catch(error)
      {
        console.log("Err2",error)
      }
}

   useEffect(()=>{
    apiCall();
   },[]) 

   const handleLikes=(postId)=>{
       if(activeLike===postId)
       {
        setActiveLikeId(null)
        
       }
       else{
        setActiveLikeId(postId)
       }
   }
 
//    useEffect(()=>{
//     try{console.log("update -home ",Posts)
        
//     }
//     catch(rr){
//         console.log("errorr",rr)
//     }
// },[d])


 
    return (<>
     <Navbar onSearch={setSearchData}/>
     {spinner? <div id="Spinner"><img src={spin}/></div> :<>{ searchData==='' ? <div className='Home-div'>
        <div className="stories">
            
            {d.users_stories.map(story => (
                    <div key={story.user_id} className="story-preview">
                        <div className="story-image-container">
                            <img src={story.story_url} alt={story.user_name} className="story-image" />
                        </div>
                        <p className="story-name">{story.user_name}</p> 
                    </div>
                ))}
            
        </div>
        
        <div className='Posts'>
            
            {
                Posts?.posts.map((item,ind)=>(
         
                    
                    <div key={item.post_id} className='Post-con'>
                      <div className='Post-header'>
                      <Link to={`/profile/${item.user_id}`}> <div className='Post-profile'>
                                <div className='inner-circle'> 
                                    <img src={item.profile_pic} alt={item.user_name}/>
                                    </div>
                                </div></Link>
                                <div className='post-username'>
                                <Link to={`/profile/${item.user_id}`} className='linktag'> <p>{item.user_name}</p></Link>
                            </div>
                            </div>
                      <div className='Post-img'>
                        <img src={item.post_details.image_url} alt={item.user_name} />
                        </div>
                        <div className='Post-matter'>
                          <div id='symbols'>
                            {activeLike=== item.post_id ?<img src={liked} onClick={()=>{handleLikes(ind)}}/>:<img src={like} onClick={()=>{handleLikes(item.post_id)}}/>}
                            
                            <img src={comment} onClick={()=>{handleCommentClick(item.post_id)}}/> 
                            <img src={share}/>
                            </div>
                            <div> 
                                <p>{item.likes_count} likes</p>
                                <p>{item.post_details.caption}</p>
                                <h6>{item.created_at}</h6>
                                </div>
                        </div>
                        {activeCommentPostId === item.post_id && (
  <>
              <div className='cmt-big-div'>
                   <div className='cmt-div-left'>
                   <i class="fa-duotone fa-solid fa-xmark" style={{color:"white"}} onClick={() => handleCommentClick(item.post_id)}></i>
                  
                   </div>
                   <div className='cmt-div'>
                    <p>*              Comments</p>
                       {item.comments.map((ele, inx) => (
                            <div className='inner-cmt' key={inx}>
                            
                           <h3>{ele.user_id}</h3>
                            <p>{ele.comment}</p>
                         </div>
                       ))}
                  </div>
                         </div>
  </>
           )}
                        </div>
                     )
                )
                
            }

        </div>
        </div> : Posts?.posts.filter(item => item.post_details.caption.toLowerCase().includes(searchData.toLowerCase())).length===0 ?<div className='NoResultsFound'>
            <div>
            <img src={NoResultsFound}/>
            <div id="search-not-matter"><h2>Search Not Found</h2>
            <p>try different keywords or search again</p>
            </div>
            
            </div>
            
        </div> :<div className='Home-div' ><div className='Posts'>
            <h3>Search Results</h3>
            {
            
            Posts?.posts.filter(item => item.post_details.caption.toLowerCase().includes(searchData.toLowerCase())).map((item,ind)=>(
         
                    
                <div key={item.post_id} className='Post-con'>
                <div className='Post-header'>
                    <div className='Post-profile'>
                        <div className='inner-circle'> 
                            <img src={item.profile_pic} alt={item.user_name}/>
                            </div>
                        </div>
                        <div className='post-username'>
                    <p>{item.user_name}</p>
                    </div>
                    </div>
              <div className='Post-img'>
                <img src={item.post_details.image_url} alt={item.user_name} />
                </div>
                <div className='Post-matter'>
                  <div id='symbols'>
                    {!likebtn ?<img src={like} onClick={handleLikes}/>:<img src={liked} onClick={handleLikes}/>}
                    <img src={comment}/>
                    <img src={share}/>
                    </div>
                    <div>
                        <p>{item.likes_count} likes</p>
                        <p>{item.post_details.caption
                        }</p>
                        <h6>{item.created_at}</h6>
                        </div>
                </div>
                </div>
          )
     )}</div></div>
    } </>}
        </>
    );
}

export default StoryPreview;
