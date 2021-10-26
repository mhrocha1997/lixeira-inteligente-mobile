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
            setReloadUserInfo(false);
            try {
                const token = await AsyncStorage.getItem("token");
                console.log("chama", token)
                if (token){
                    console.log("chama")
                    const auth = await verifyToken(token);
                    setIsSigned(auth);
                    if (auth) setToken(token);
                    setReloadUserInfo(true);
                }
			} catch (e) {
				console.error("Erro ao ler o token", e);
			}
		}
		authenticate();
	}, []);

	async function fetchUserData() {
		const data = await getUserData(token);
		setPoints(data.points);
		setRole(data.role);
        console.log(role,data.role)
		setUserId(data.id);
        setDiscardNumber(data.discards);
        setReloadUserInfo(false);
	}
	useEffect(() => {
        if(reloadUserInfo) fetchUserData();
	}, [token, reloadUserInfo]);

	function handleUserInfoUpdate() {
		setReloadUserInfo(true);
	}

	function handleLogin(token: string) {
		setToken(token);
		setIsSigned(true);
	}

	return (
		<UserContext.Provider
			value={{ isSigned, token, points, discardNumber, handleLogin, role, userId, handleUserInfoUpdate }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
