import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { autenticar } from '../services/auth';

const AuthContext = createContext({
    signed: false,
    user: {},
    userType: 'cliente',
    signIn: () => {},
    signOut: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = async () => {
        const response = await autenticar();
        console.log(response.user)
        setUser(response.user);
    }

    const signOut = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;