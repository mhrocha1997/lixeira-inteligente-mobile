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
		const userData = {
            id: data.id,
			name: data.name,
			points: data.points,
			discards: data.discards,
			role: data.role,
            profileImage: data.imageData,
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
    try {
        const response = await api.post("/auth/signin", data);
        if (response.status == 201) {
            const { token } = response.data;
            return token;
        } else {
            return "";
        }
    }catch(e){
        console.error("Error on signin", e);
        return ""
    }
}

export async function signup(data: object) {
    try{
        const response = await api.post("/auth/signup", data);
        if (response.status == 201) {
            return true;
        }
        return false;
    }catch(e){
        console.error("Error on signup", e);
    }
}

export async function getAllUsers(token: string){
    try{
        const response = await api.get('/users',
            {'headers':{
                'Authorization': `Bearer ${token}`
            }}
        );
        if(response.status == 200){
            return response.data.found.users;
    
        }
        return [] as UserData[];
    }catch(e){
        console.error("Error on GetAllUsers", e)
    }
}
