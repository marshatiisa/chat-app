import React from 'react';
import { LogOut} from 'react-feather';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const {user, handleUserLogout} = useAuth()
    return (
      <div id='header--wrapper'>
        {user ? (
            <>
                <div className="header--textContainer">
                  <p className="header--text">Welcome to The Void, <span className="header--username">{user.name}</span></p>
                  <LogOut onClick={handleUserLogout} className='header--link' />
                </div>
            </>
        ) : (
            <button>LOGIN</button>
        )}
      </div>
    )
}

export default Header
