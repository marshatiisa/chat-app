import { createContext, useState, useEffect, useContext} from 'react'
import { account } from '../appwriteConfig'

const AuthContext = createContext()

// moved this from just below the useeffect
export const handleUserLogin = async (e, credentials) => {
    e.preventDefault()

    try{
        const response = await account.createEmailSession(credentials.email, credentials.password)
        console.log('LOGGED IN:', response)
    } catch(err) {
        console.log(err)
    }
}

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(true)


    useEffect(() => {
        setLoading(false)
    }, [])



    const contextData = {
        user,
        handleUserLogin,
    }

    return  <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
}

//creating custom hook and using it to get user
export const userAuth = () => {return useContext(AuthContext)}

export default AuthContext
