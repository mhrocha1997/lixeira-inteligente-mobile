import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { UserData } from "../types/UserProps";
import api from "./api";

export async function getUserData(token: string): Promise<UserData> {
	const response = await api.get("/auth/me", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status == 200) {
		const data = response.data;
        console.log(data)
		const userData = {
			name: data.name,
			points: data.points,
			quantity: data.quantity,
			role: data.role,
		};
		return userData;
	} else {
		return {} as UserData;
	}
}

export async function verifyToken(token: string | null): Promise<boolean> {
	if (token !== null) {
		const response = await api.get("/auth/me", {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.status == 200) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}

export async function signin(data: any) {
	const response = await api.post("/auth/signin", data);
	if (response.status == 201) {
		const { token } = response.data;
		return token;
	} else {
		return "";
	}
}

export async function signup(data: object) {
	const response = await api.post("/auth/signup", data);
	if (response.status == 201) {
		return true;
	}
	return false;
}
