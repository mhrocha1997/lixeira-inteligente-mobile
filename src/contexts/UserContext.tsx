import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";

type Children = {
    children: ReactNode;
  };
  
type UserContext = {
    token: string;
    isSigned: boolean;
    handleLogin: (token: string) => void;
    points: number;
}

const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: Children) => {
  const [token, setToken] = useState<string>('');
  const [isSigned, setIsSigned] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function getPoints() {
      const response = await api.get("/get/user", {
        headers: { Authorization: token },
      });
      setPoints(response.data.data[0].points);
    }
    getPoints();
  }, []);

  useEffect(() => {
    async function verifyToken() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          setToken(token);
          const response = await api.get("/token", {
            headers: { Authorization: token },
          });
          if (response.status == 200) {
            setIsSigned(true);
          } else {
            setIsSigned(false);
          }
        }
      } catch (e) {
        console.error("Erro ao ler o token", e);
      }
    }
    verifyToken();
  }, []);

  function handleLogin(token: string) {
    setToken(token);
    setIsSigned(true);
  }

  return (
    <UserContext.Provider value={{ isSigned, token, points, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
