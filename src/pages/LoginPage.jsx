import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import logoImage from '../assets/void-logo.png'

const LoginPage = () => {
    const {user, setUser, handleUserLogin} = useAuth()
    const navigate = useNavigate()
console.log('user:', user)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(user){
            navigate('/login') // redirects user to home page
        }
    }, [])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }

    return (
        <div className='auth--container'>
            <img src={logoImage} alt='Logo' className='logo--image' />
            <div className='form--wrapper'>
            <form onSubmit={(e) => {handleUserLogin(e, credentials)} }>
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
                    name='password'
                    placeholder='Enter password'
                    value={credentials.password}
                    onChange={handleInputChange}
                    />
                </div>

                <div className='field--wrapper'>
                    <input className='btn btn--lg btn--main' type='submit' value='Login'/>
                </div>
            </form>
            <p>Don't have an account? Register <Link to='/register'>here</Link> </p>
            <div className="login--testCredsContainer">
              <p>You can test the app with these credentials:</p>
              <p className="login--testCreds">email: <span className="test--email">test1234@gmail.com</span></p>
              <p className="login--testCreds">password: <span className="test--password">test1234</span></p>
            </div>
            </div>
        </div>
    )
}

export default LoginPage
