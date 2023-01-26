import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

function AuthContextProvider({ children }) {

    const [authToken, setAuthToken] = useState()

    function authenticate(token) {
        setAuthToken(token)
        console.log('token: ', token)
        AsyncStorage.setItem('token', token)
    }

    function logout() {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

export const useAuth = () => useContext(AuthContext)

