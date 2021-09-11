import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";

import { getUserData, verifyToken } from "../services/api";

type Children = {
    children: ReactNode;
  };
  
type UserContext = {
    token: string | null;
    isSigned: boolean;
    handleLogin: (token: string) => void;
    points: number;
    isAdmin: boolean;
}

const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: Children) => {
  const [token, setToken] = useState<string | null>('');
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [points, setPoints] = useState(0);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    async function fetchUserData(){
      const data = await getUserData();
      setPoints(data.points);
      setAdmin(data.isAdmin)
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function authenticate() {
      try {
        const token = await AsyncStorage.getItem("token");
        const auth = await verifyToken(token);
          setIsSigned(auth);
          setToken(token)
      } catch (e) {
        console.error("Erro ao ler o token", e);
      }
    }
    authenticate();
  }, []);

  function handleLogin(token: string) {
    setToken(token);
    setIsSigned(true);
  }

  return (
    <UserContext.Provider value={{ isSigned, token, points, handleLogin, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
