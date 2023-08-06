import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import logoImage from '../assets/small-void-logo.png';

const RegisterPage = () => {

    const {handleUserRegister} = useAuth()
    const MAX_USERNAME_LENGTH = 6;

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === 'name') {
          value = value.slice(0, MAX_USERNAME_LENGTH);
        }

        setCredentials({...credentials, [name]:value})
    }

    return (
        <div className='auth--container'>
        <img src={logoImage} alt='Logo' className='logo--smallImage' />
        <div className='form--wrapper'>
        <form onSubmit={(e) => {handleUserRegister(e, credentials)} }>
        <div className='field--wrapper'>
                <label >Username:</label>
                <input
                className='input--credentials'
                type='text'
                required
                name='name'
                placeholder='Enter username - 6 chars only'
                value={credentials.name}
                onChange={handleInputChange}
                maxLength={MAX_USERNAME_LENGTH}
                />
            </div>
            <div className='field--wrapper'>
                <label >Email:</label>
                <input
                className='input--credentials'
                type='email'
                required
                name='email'
                placeholder='Enter your email'
                value={credentials.email}
                onChange={handleInputChange}
                />
            </div>

            <div className='field--wrapper'>
                <label >Password:</label>
                <input
                className='input--credentials'
                type='password'
                required
                name='password1'
                placeholder='Enter password'
                value={credentials.password1}
                onChange={handleInputChange}
                />
            </div>

            <div className='field--wrapper'>
                <label >Confirm Password:</label>
                <input
                className='input--credentials'
                type='password'
                required
                name='password2'
                placeholder='Confirm password'
                value={credentials.password2}
                onChange={handleInputChange}
                />
            </div>

            <div className='field--wrapper'>
                <input className='btn btn--lg btn--main' type='submit' value='Sign Up'/>
            </div>
        </form>
        <p>Already have an account? Register <Link to='/login'>here</Link> </p>

        </div>
    </div>
    )

}

export default RegisterPage
