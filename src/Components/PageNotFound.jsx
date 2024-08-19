import { Link } from 'react-router-dom'
import notFound from '../assets/PageNotFound.png'
import './PageNotFound.css'

export const PageNotFound=()=>{
    return(
        <div id="PageNotFound">
           <div id="NotFoundCenter">
            <div id="Ntfound-img">
            <img src={notFound} />
            </div>
              
              <div id="Ntfound-matter">
                 <h1>Page Not Found</h1><br></br>
                 <p>we are sorry, the page you requested could not be found.<br></br>Please go back to the homepage.</p>
                 <br></br>
               <Link to='/' className='linktag'><button> Home Page </button></Link>
              </div>
           </div>
        </div>
    )
}