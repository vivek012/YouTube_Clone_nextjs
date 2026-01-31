"use client"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth, provider } from "./firebase";
import { axiosInstance } from "./axiosInstance";


interface userType {
    _id: string,
    name: string,
    email: string,
    channelName?: string,
    description: string,
    image: string,
    joinedon: Date
}

interface UserContextType {
    user: userType | null;
    login: (userdata: userType) => void;
    logout: () => Promise<void>;
    handleGoogleSignIn: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
     const [user, setUser] = useState<userType | null>(null);
     const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ SAFELY read localStorage on client only
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


   
    // const [user, setUser] = useState<userType | null>(() => {
    //   const storedUser = localStorage.getItem("user");
    //   return storedUser ? JSON.parse(storedUser) : null;
    // });

    const login = (userdata: userType) => {
        setUser(userdata)
        console.log(userdata)
        localStorage.setItem("user", JSON.stringify(userdata))
    }

    const logout = async () => {
        setUser(null)
        localStorage.removeItem("user")
        try {
            await signOut(auth)
            setIsSubscribed(false)

        } catch (error) {
            console.error("Error during sign out:", error)

        }
    }


    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const firebaseUser = result.user;
            const payload = {
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                image: firebaseUser.photoURL || "http://github.com/shadcn.png"
            };

            const response = await axiosInstance.post("/api/user/login", payload)
            login(response.data.result)
        } catch (error) {
            console.error(error)

        }

    }
    5

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const payload = {
                        email: firebaseUser.email,
                        name: firebaseUser.displayName,
                        image: firebaseUser.photoURL || "http://github.com/shadcn.png"
                    };
                    const response = await axiosInstance.post("/api/user/login", payload)
                    login(response.data.result)

                } catch (error) {
                    console.error(error)
                    logout();
                }
            }
        })
        return () => unsubscribe();
    }, [])



    const value = {
        user,
        login,
        logout,
        handleGoogleSignIn
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>

    )

}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }

    return context;
};
