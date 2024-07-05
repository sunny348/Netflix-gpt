import React from 'react';
import { logo1 } from '../utils/logo'; // Ensure the import path is correct

const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img className='w-44' src={logo1} alt='Netflix logo' /> {/* Correct the variable name to 'logo' */}
    </div>
  );
}

export default Header;
