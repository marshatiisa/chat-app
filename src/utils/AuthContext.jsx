import { createContext, useState, useEffect, useContext} from 'react'
import { account } from '../appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    useEffect(() => {
        if(user){
        getUserOnLoad()
        } else {
            setLoading(false)
        }
    }, [])

    const getUserOnLoad = async () => {
        try{
            console.warn('about to get account', user)
            const accountDetails = await account.get()
            console.warn('done')
            setUser(accountDetails)

        } catch(err){
            console.error('getUser on load', err)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
    
        try{
            const response = await account.createEmailSession(credentials.email, credentials.password)
            console.log('LOGGED IN:', response)
            const accountDetails = await account.get()
            setUser(accountDetails)
            navigate('/')
        } catch(err) {
            console.error(err)
        }
    }

    const handleUserLogout = async () => {
        account.deleteSession('current')
        setUser(null)
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()

        if(credentials.password1 !== credentials.password2 ){
            alert('Passwords do not match')
            return
        }
        try{
    //we create the user account, id is from appwrite
            let response = await account.create( 
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
                ) 
// we create an email session
                await account.createEmailSession(credentials.email, credentials.password1)
// we get the details, set the user and use navigate to redirect the user to the homepage                
            const accountDetails = await account.get()
            setUser(accountDetails)
            console.log('accountDetails:',accountDetails)
            navigate('/')
        }catch(err){
            console.error(err)
        }
         
    }

    const contextData = {
        user,
        handleUserLogin,
        setUser,
        handleUserLogout,
        handleUserRegister
    }

    return  <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
}

//creating custom hook and using it to get user
export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext
