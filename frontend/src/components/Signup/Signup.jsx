import React, { useState, useEffect } from "react";
import "./Signup.css";
import { motion } from "framer-motion";
import {Logo} from "../NavBar/NavBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { googleSignIn, githubSignIn } from '../../firebaseConfig.js';
import { GoogleImage, GithubImage } from "../Login/Login.jsx";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [userPassError, setUserPassError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    setUserNameError("");
    setUserPassError("");
    setIsSubmitted(true);

    let isValid = true;

    if (userName.trim() === "") {
      setUserNameError("Username cannot be empty");
      isValid = false;
    }
    if (userPass.trim() === "") {
      setUserPassError("Password cannot be empty");
      isValid = false;
    }
    if (userPass !== confirmPass) {
      setUserPassError("Password doesn't match");
      isValid = false;
    }
    if (!isValid) return;

    console.log(userName, userPass, confirmPass);
    setUserName("");
    setUserPass("");
    setConfirmPass("");
  };
  
   const googleAuthHandler = async() => {
    const result = await googleSignIn();
    const user = result ? result.user : null;

    if(user) {
      navigate("/home");
      setIsSubmitted(true)
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
      initial={{ opacity: 0, scale: 0.96, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="signup-page"
    >
      <form className="Signup-Container" onSubmit={handleSignUpSubmit}>

        <div className="Signup-Header">
            <img src={Logo} alt="Logo" className="signup-logo" />
            <h1>Create Account</h1>
        </div>


        <div className="Signup-Form-Options">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userNameError && <p className="error-text">{userNameError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
          />
          {userPassError && <p className="error-text">{userPassError}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {isSubmitted && confirmPass === "" && (
            <p className="error-text">Confirm password cannot be empty</p>
          )}
          {isSubmitted && confirmPass !== userPass && confirmPass !== "" && (
            <p className="error-text">Passwords do not match</p>
          )}

        <p>Already have an account?</p>
        <Link to="/" className="Login-link">Login</Link>

        <div className="Signup-Separator">OR</div>

        <div className="Signup-Social-Options">
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

        

          <button
            type="submit"
            disabled={confirmPass !== userPass || !userPass || !userName}
          >
            Sign Up
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Signup;

