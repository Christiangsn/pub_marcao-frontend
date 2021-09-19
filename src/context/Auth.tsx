import { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import { setCookie, parseCookies } from 'nookies'
import { api } from '../services/locals'

declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> {}
}

interface AuthProfileUser {
    name?: string;
}

interface AuthUser {
    email: string;
    password: string;
}

interface AuthContextTypes {
    isAuthenticated: boolean;
    user: AuthProfileUser | null;
    signIn: (data: AuthUser) => Promise<void>
}

export const AuthContext = createContext( {} as AuthContextTypes )

export function AuthProvider ({ children }: any) {
    const [user, setUser] = useState<AuthProfileUser | null>(null)
    const history = useHistory()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'authToken': token } = parseCookies()
        if(token) {
            api.get(`/isAuthenticattion?`)
            .then( ({ data }: any) => {
                setUser({
                    name: data.name
                })
            })
        } else {
            history.push('/') 
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn ({ email, password}: AuthUser) {

        const { data } = await api.post('/login', { email, password})
        const user = data.user
        const token = data.token

        setCookie(undefined, 'authToken', token, {
            maxAge: 60 * 60 * 1, // 1 hours
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        setUser({
            name: user.name
        })
        history.push('/home')     
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
