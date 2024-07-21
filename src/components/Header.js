import React, { useEffect } from 'react';
import { logo1 } from '../utils/logo'; // Ensure the import path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate]); // Include dispatch and navigate in dependency array

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={logo1} alt='Netflix logo' />

      {user && (
        <div className='flex'>
          <img className='w-12 h-12 p-1' alt='usericon' src={user?.photoURL} />
          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
