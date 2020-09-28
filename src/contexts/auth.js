import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import * as auth from '../services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = localStorage.getItem('@GofAuth:user');
            const storagedToken = localStorage.getItem('@GofAuth:token');

            if (storagedUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }

            setLoading(false);
        }

        loadStoragedData();
    }, []);

    async function signIn(username, password) {
        const user = {
            username,
            password
        };

        try {
            const response = await api.post("/auth", user);
            if (response) {
                setUser(response.data.user);
    
                api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        
                localStorage.setItem('@GofAuth:user', JSON.stringify(response.data.user));
                localStorage.setItem('@GofAuth:token', response.data.user);
                return true;
            }
        } catch (error) {
            return false;
        }

        return false;
    }

    async function signOut() {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user: user, signIn, signOut, loading: loading }}>
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}