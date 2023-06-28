import { createContext, useState, useEffect, useContext} from 'react'
import { account } from '../appwriteConfig'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(true)


    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
    
        try{
            const response = await account.createEmailSession(credentials.email, credentials.password)
            console.log('LOGGED IN:', response)
            const accountDetails = account.get()
            setUser(accountDetails)
            navigate('/')
        } catch(err) {
            console.log(err)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        setUser
    }

    return  <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
}

//creating custom hook and using it to get user
export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext
