
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { fetchSignInMethodsForEmail, signInWithCredential } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKDDmwFHNhLX3VEWOy-9pfosIX0JfMki4",
  authDomain: "algo-fight.firebaseapp.com",
  projectId: "algo-fight",
  storageBucket: "algo-fight.firebasestorage.app",
  messagingSenderId: "811777562185",
  appId: "1:811777562185:web:210953e018470785aad198",
  measurementId: "G-E1RY503D7K"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const googleBox = new GoogleAuthProvider();
const githubBox = new GithubAuthProvider();

export const  googleSignIn = async() => {
  try {
    const result = await signInWithPopup(auth, googleBox);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log("Successfully signed in");
    
    return {user};
    
  } catch (error) {

    console.log("Google-sign-in error",error.code);

    if (error.code === 'auth/account-exists-with-different-credential') {
            

            const email = error.customData.email;
            
            
            const pendingCred = GoogleAuthProvider.credentialFromResult(error);

            
            const methods = await fetchSignInMethodsForEmail(auth, email);
            const firstSignInMethod = methods[0]; 

            
            alert(`
                You already have an account with ${email}. 
                Please sign in first with your original provider: ${firstSignInMethod}. 
                We will then link your GitHub account to it.
            `);
            
            
            if (firstSignInMethod === 'github.com') {
                const githubProvider = new GithubAuthProvider();
                
                
                const result = await signInWithPopup(auth, githubProvider);
                
                
                const user = result.user;
                await user.linkWithCredential(pendingCred);
                
                console.log("Successfully linked GitHub to existing account.");
                return {user};
            }
            
          }
          else{
            console.log("Other sign-up error",error.code);
          }
  }
}
export const  githubSignIn = async() => {
  try {
    const result = await signInWithPopup(auth, githubBox);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log("Successfully signed in");

    return {user};
    
  } catch (error) {

    console.log("Google-sign-in error",error.code);

    if (error.code === 'auth/account-exists-with-different-credential') {
            
            
            const email = error.customData.email;
          
            
            const pendingCred = GithubAuthProvider.credentialFromResult(error);

            const methods = await fetchSignInMethodsForEmail(auth, email);
            const firstSignInMethod = methods[0]; 

           
            alert(`
                You already have an account with ${email}. 
                Please sign in first with your original provider: ${firstSignInMethod}. 
                We will then link your GitHub account to it.
            `);
            
            
            if (firstSignInMethod === 'google.com') {
                const googleProvider = new GoogleAuthProvider();
                
                
                const result = await signInWithPopup(auth, googleProvider);
                
                
                const user = result.user;
                await user.linkWithCredential(pendingCred);
                
                console.log("Successfully linked GitHub to existing account.");
                return {user};
            }
            
        }
        else{
            console.log("Other sign-up error",error.code);
          }
  }
}