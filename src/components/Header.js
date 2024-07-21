import React from 'react';
import { logo1 } from '../utils/logo'; // Ensure the import path is correct
import { signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();

  const user = useSelector(store => store.user);



  const handleSignOut = () => {

signOut(auth).then(() => {
  navigate("/");

  // Sign-out successful.
}).catch((error) => {
  navigate("/error");

  // An error happened.
});



  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={logo1} alt='Netflix logo' />

      {user && (
      <div className='flex'>
        <img  className='w-12 h-12 p-1'
        alt='usericon'
        src={user?.photoURL}/>

        <button  onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>
      )}
    </div>

   
  );
}

export default Header;
