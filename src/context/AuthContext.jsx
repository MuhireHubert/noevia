import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signOut() {
        return firebaseSignOut(auth);
    }

    const value = { user, loading, signIn, signOut };

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext (AuthContext);
    if(!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}