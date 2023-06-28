import { createContext, useState, useEffect, useContext} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(true)


    useEffect(() => {
        setLoading(false)
    }, [])

    const contextData = {
        user
    }
    return  <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
}

//creating custom hook and using it to get user
export const userAuth = () => {return useContext(AuthContext)}

export default AuthContext