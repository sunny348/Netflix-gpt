import React, { useRef, useState } from 'react';
import Header from './Header'; // Ensure the import path is correct
import { logo } from '../utils/logo'; // Ensure the import path is correct

import {checkValidateData} from "../utils/validate";

import {  createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage,seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  

  const handleClick = () => {
  

    console.log(email.current.value);
    console.log(password.current.value);
      const message = checkValidateData(email.current.value,password.current.value);
      seterrorMessage(message);

     if(message) return;

     if(!isSignInForm){

      createUserWithEmailAndPassword(auth,email.current.value,password.current.value,name.current.value)

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: "https://occ-0-2991-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e",
    }).then(() => {
      // in this i am fetching data from the current user
      const {uid, email,displayName,photoURL} = auth.currentUser;

      dispatch(addUser({uid: uid,email:email,displayName:displayName, photoURL:photoURL}));


   
      navigate("/browse")
      // Profile updated!
      // ...
    }).catch((error) => {

      seterrorMessage(error.message);

      // An error occurred
      // ...
    });

 

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode, errorMessage)
    // ..
  });
     } else {

      // sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user);
    navigate("/browse");
    

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    seterrorMessage(errorCode + "-" + errorMessage);

  });


      


     }

    



     




  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)


  }



  return (
    <div>
      <Header />

      <div className='absolute'>
        <img src={logo} alt="Netflix logo" />
      </div>

     
      <form  onSubmit={(e) => e.preventDefault()}
      className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (
          <input
          ref={name} type='text'
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
        ref={email}
         type='text' placeholder='Email Address' className='p-2 my-2 w-full bg-gray-700' />

        <input
        ref={password}
         type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-700' />
         <p className='text-red-500'>{errorMessage}</p>
        <button className='p-4 my-2 bg-red-700 w-full rounded-lg'  onClick={handleClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-5 cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix ? Sign Up Now" : "Already register? Sign In Now"}</p>
      </form>
      </div>
  
  );
}

export default Login;
;

