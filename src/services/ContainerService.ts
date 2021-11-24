import { ContainerProps } from "../types/ContainerProps";
import api from "./api";

export async function getAllContainers(token: string) {
	try {
		const response = await api.get("/containers", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.status == 200) {
			return response.data.found.containers as ContainerProps[];
		} else {
			return [] as ContainerProps[];
		}
	} catch (e) {
		console.error("Error on getAllContainers", e);
		return [] as ContainerProps[];
	}
}

export async function createContainer(token: string, data: Object) {
	try {
		const response = await api.post("/containers", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status == 201) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error("Error on createContainer", e);
		return false;
	}
}
export async function getLocationLink(id: string, token: string){
    try{
        const response = await api.get(`/containers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if (response.status == 200){
            const location = response.data.container.location;
            return location;
        }
    }catch(e){
        console.error("Error on getLocationLink", e);
        return ""
    }
}
