
import instaName from './name.jpeg';
import './SignUp.css';
export const SignUp=()=>{
    return(
        <>
        <div id="Signup-page">
            <div id="sign-form">
                <div id="sign-inner">
                    <img src={instaName}/>
                    <h5>
                        Sign up to see photos and videos from your friends.
                    </h5>
                    <div id="Form">
                    <input type="email" placeholder="Email"/>
                    <input type="text" placeholder="Full Name"/>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    </div>
                    <h5>
                    People who use our service may have uploaded your contact information to Instagram. Learn More
                    </h5>
                    <h5>
                    By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                    </h5>
                    <button>Sign Up</button>
                </div>
                <div id="sign-inner-bottom">
                    <h5>Have an account? Log in</h5>
                </div>
            </div>

        </div>
        </>
    )
}