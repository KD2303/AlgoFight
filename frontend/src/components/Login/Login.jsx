import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import "./Login.css";
import { motion } from 'framer-motion';
import GoogleImage from './Google.png';
import GithubImage from './Github.png';
import { googleSignIn, githubSignIn } from '../../firebaseConfig.js';
import {Logo} from "../NavBar/NavBar.jsx";
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

function Login(){
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userPassError, setUserPassError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    // If already logged in, redirect to home
    useEffect(() => {
      if (user) navigate("/home");
    }, [user, navigate]);
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        
        setUserNameError("");  
        setUserPassError("");  
        
        let isValid = true; 

        if(userName.trim() === ""){
            setUserNameError("Username cannot be empty");
            isValid = false;
        }
        if(userPass.trim() === ""){
            setUserPassError("Password cannot be empty");
            isValid = false;
        }
        if(!isValid){
            return;
        }

        console.log(userName, userPass);
        setUserName("");
        setUserPass("");
        // Note: username/password login is not yet wired to a backend endpoint.
        // Use Google or GitHub sign-in for now.
    }
    const googleAuthHandler = async() => {
        const result = await googleSignIn();
        const user = result ? result.user : null;
    
        if(user) {
          navigate("/home");
        };
      }
    
      const githubAuthHandler = async() => {
        const result = await githubSignIn();
        const user = result ? result.user : null;
    
        if(user) {
          navigate("/home");
          setIsSubmitted(true)
        };
      }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <div className="login-page">
            <form className="Login-Container" onSubmit={handleSubmit}>
                
                <div className="Login-Header">
                    <img src={Logo} alt="Logo" className="signup-logo" />
                    <h2>Welcome to Algo Fight</h2>
                
                </div>

                <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                />
                {userNameError && <p className="error-message">{userNameError}</p>}

                <input 
                type="password"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                placeholder="Password"
                />
                
                {userPassError && <p className="error-message">{userPassError}</p>}
                <p>Don't have an account?</p>
                <Link to="/signup" className="signup-link">Sign Up</Link>
                <div className="Login-Separator">OR</div>

                <div className="Login-Social-Options">
                <button className="social-btn google"
                type="button"
                onClick={googleAuthHandler}
                
                >
                    <img src={GoogleImage} alt="Google" />
                </button>

                <button className="social-btn github"
                type="button"
                onClick={githubAuthHandler}
                >
                    <img src={GithubImage} alt="GitHub" />
                </button>

                
                </div>
                
                 
                <button type="submit">Login</button>
            </form>
            </div>
        </motion.div>
    );
}

export default Login;
export {GoogleImage, GithubImage};