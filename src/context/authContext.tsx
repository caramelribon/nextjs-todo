"use client";
import app from "../firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../../app/types/User.types";
import userFunc from "../repository/user";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: Omit<User, "password"> | null;
};

const auth = getAuth(app);

export const AuthContext = createContext<AuthContextType>({ user: null });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        console.log(userCredential);
        const userData = await userFunc.getUser(userCredential.uid);
        if (!userData) return;
        console.log(userData);
        setUser({
          id: userCredential.uid,
          name: userData.name,
          email: userCredential.email || "",
        });
        console.log("ここ");
        console.log(user);
      } else {
        setUser(null);
      }
      //   setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
