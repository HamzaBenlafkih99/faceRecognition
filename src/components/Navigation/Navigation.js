import React from 'react';
import ProfileIcon from '../profileIcon/profileIcon';
const Navigation = ({ onRouteChange, isSignedIn, toggelModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end', marginRight: '60px'}}>
        <ProfileIcon onRouteChange={onRouteChange} toggelModal={toggelModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;