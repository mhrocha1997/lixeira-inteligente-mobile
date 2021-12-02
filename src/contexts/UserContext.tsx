import React, { createContext, useEffect, useState, ReactNode } from "react";
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
    discardNumber: number;
	role: string;
	userId: string;
    handleUserInfoUpdate: () => void;
    getToken: () => Promise<string>;
    getUserId: () => Promise<string>;
};

const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: Children) => {
	const [token, setToken] = useState<string>("");
	const [isSigned, setIsSigned] = useState<boolean>(false);
	const [points, setPoints] = useState(0);
	const [discardNumber, setDiscardNumber] = useState(0);
	const [role, setRole] = useState("");
	const [userId, setUserId] = useState("");
	const [reloadUserInfo, setReloadUserInfo] = useState(true);

	useEffect(() => {
		async function authenticate() {
            // setReloadUserInfo(false);
            readToken();
            
		}
		authenticate();
	}, []);


    async function getToken(){
        if (token){
            return token;
        }
        return await readToken();
    }

    async function getUserId(){
        if(userId){
            return userId
        }
        const userData = await fetchUserData();
        setReloadUserInfo(false)
        return userData.id;
    }

    async function readToken(){
        try {
            const stored_token = await AsyncStorage.getItem("token");
            if (stored_token){
                const auth = await verifyToken(stored_token);
                setIsSigned(auth);
                if (auth) {
                    setToken(stored_token);
                    setReloadUserInfo(true);
                    return stored_token;
                }
                
            }
            return "";
            
        } catch (e) {
            console.error("Erro ao ler o token", e);
            return "";
        }
    }
	async function fetchUserData() {
        const stored_token = await getToken();
		const data = await getUserData(stored_token);
		setPoints(data.points);
		setRole(data.role);
		setUserId(data.id);
        setDiscardNumber(data.discards);
        setReloadUserInfo(false);
        return data;
	}
	useEffect(() => {
        if(reloadUserInfo) fetchUserData();
	}, [reloadUserInfo]);

	function handleUserInfoUpdate() {
		setReloadUserInfo(true);
	}

	function handleLogin(token: string) {
		setToken(token);
		setIsSigned(true);
	}

	return (
		<UserContext.Provider
			value={{ isSigned, token, points, discardNumber, handleLogin, role, userId, handleUserInfoUpdate, getToken, getUserId }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
