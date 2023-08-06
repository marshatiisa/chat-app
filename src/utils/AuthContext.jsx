import { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            getUserOnLoad();
        } else {
            setLoading(false);
        }
    }, []);

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (err) {
            console.error('getUser on load', err);
        }
        setLoading(false);
    };

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            const accountDetails = await account.get();
            setUser(accountDetails);

            // Store the authentication token in local storage or session storage
            localStorage.setItem('authToken', response.$id); // Use local storage for persistent login
            // sessionStorage.setItem('authToken', response.$id); // Use session storage for non-persistent login

            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleUserLogout = async () => {
        account.deleteSession('current');
        setUser(null);

        // Remove the stored authentication token on logout
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Navigate to the login page after logout
        navigate('/login');
    };

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault();

        if (credentials.password1 !== credentials.password2) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
            await account.createEmailSession(credentials.email, credentials.password1);
            const accountDetails = await account.get();
            setUser(accountDetails);

            // Store the authentication token in local storage or session storage
            localStorage.setItem('authToken', response.$id); // Use local storage for persistent login
            // sessionStorage.setItem('authToken', response.$id); // Use session storage for non-persistent login

            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const contextData = {
        user,
        handleUserLogin,
        setUser,
        handleUserLogout,
        handleUserRegister,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
