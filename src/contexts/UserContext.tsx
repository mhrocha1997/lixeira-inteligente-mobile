import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUserData, verifyToken } from "../services/UserService";

type Children = {
    children: ReactNode;
  };
  
type UserContext = {
    token: string;
    isSigned: boolean;
    handleLogin: (token: string) => void;
    points: number;
    role: string;
}

const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: Children) => {
  const [token, setToken] = useState<string>('');
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [points, setPoints] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function authenticate() {
      try {
        const token = await AsyncStorage.getItem("token");
        const auth = await verifyToken(token);
        setIsSigned(auth);
        if (auth && token != null) setToken(token)
      } catch (e) {
        console.error("Erro ao ler o token", e);
      }
    }
    authenticate();
  }, []);

  useEffect(() => {
    async function fetchUserData(){
      const data = await getUserData(token);
      setPoints(data.points);
      setRole(data.role)
    }
    fetchUserData();
  }, []);

  function handleLogin(token: string) {
    setToken(token);
    setIsSigned(true);
  }

  return (
    <UserContext.Provider value={{ isSigned, token, points, handleLogin, role }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
