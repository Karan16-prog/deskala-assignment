import React,{useContext, createContext, useState, FC, useEffect} from 'react'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, UserCredential } from "firebase/auth";
import { auth } from '../firebase';

export type AuthContextType = {
  currentUser: string;
  signUp: (email: any, password: any) => Promise<UserCredential>;
  logIn: (email: any, password: any) => Promise<UserCredential>
};

const AuthContext = createContext<AuthContextType|null>(null);

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:{children:any}) => {
    const [currentUser,setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
   

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])
   
    const signUp = (email:string,password:string) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const logIn = (email:string,password:string)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const value = {
        currentUser,
        signUp,
        logIn
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


