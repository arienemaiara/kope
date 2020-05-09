import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { autenticar } from '../services/auth';

import api from '../services/api';

const AuthContext = createContext({
    loading: true,
    signed: false,
    user: {},
    userType: '',
    signIn: () => { },
    signOut: () => { }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStorageData = async () => {
            const storageUser = await AsyncStorage.getItem('user');
            const storageUserType = await AsyncStorage.getItem('userType');
            const storageToken = await AsyncStorage.getItem('token');

            if (storageUser && storageToken && storageUserType) {
                api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

                setUser(JSON.parse(storageUser));
                setUserType(storageUserType);
                setLoading(false);
            }
        }

        loadStorageData();

    }, []);

    const signIn = async (userType, email, password) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            autenticar(userType, email, password)
            .then(async ({ data }) => {
                setUser(data.user);
                setUserType(userType);
                api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                await AsyncStorage.setItem('userType', userType);
                await AsyncStorage.setItem('token', data.token);

                setLoading(false);

                resolve();
            })
            .catch((error) => {
                reject(error.response.data.error);
            });
        });
        
    }

    const signOut = () => {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ loading, signed: !!user, user, userType, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;