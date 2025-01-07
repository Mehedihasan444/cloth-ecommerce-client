/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect } from "react";
import auth from "../firebase/firebase.config.ts";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail, User } from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic.tsx";
import { toast } from "sonner";



const provider = new GoogleAuthProvider();
interface AuthContextType {
  signIn_Google: () => Promise<any>;
  update_profile: (name: string, imgURL: string) => Promise<void>;
  create_user_with_email: (email: string, password: string) => Promise<any>;
  signIn_with_email: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  signInWithPopup: any;
  user: any;
  loading: boolean;
  update_password: (email: string) => void;
  email_verify: () => void;
  sendEmailVerification: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | false>(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()
  // create user with email and password

  const create_user_with_email = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  // signIn with email and password

  const signIn_with_email = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const signIn_Google = async () => {
    return await signInWithPopup(auth, provider);
  };

  // update profile
  const update_profile = async (name: string, imgURL: string) => {
    if (!auth.currentUser) {
      return Promise.reject(new Error('No user is currently signed in'));
    }
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgURL,
    });
  };
  // forget/reset user password
  const update_password = async (email: string) => {
    await sendPasswordResetEmail(auth, email)

  }
  // Email verification
  const email_verify = async () => {
    if (!auth.currentUser) {
      return Promise.reject(new Error('No user is currently signed in'));
    }
    return await sendEmailVerification(auth.currentUser)

  }

  // sign Out
  const logOut = async () => {
    setLoading(true)
    return await signOut(auth);
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Create user info object
          const userInfo = {
            name: currentUser.displayName,
            email: currentUser.email,
            image: currentUser.photoURL,
            role: "user",
            phone: '',
            no_orders: 0,
            total_spend: 0,
            password: '',
            address: ''
          };

          // First check if user exists
          const userResponse = await axiosPublic.get(`/users/${currentUser.email}`);

          if (!userResponse.data) {
            // User doesn't exist, create new user
            const createResponse = await axiosPublic.post("/users", userInfo);
            if (createResponse.data.insertedId) {
              toast.success("Account registered successfully");
            }
          }

          // Get latest user data
          const userData = userResponse.data || (await axiosPublic.get(`/users/${currentUser.email}`)).data;
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        toast.error('Authentication error occurred');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]); // Remove user dependency to prevent loops

  const info = {
    signIn_Google,
    update_profile,
    create_user_with_email,
    signIn_with_email,
    logOut,
    signInWithPopup,
    user,
    loading,
    update_password,
    email_verify,
    sendEmailVerification
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;