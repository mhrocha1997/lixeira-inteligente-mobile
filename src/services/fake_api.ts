import axios from 'axios';
import { UserData } from '../types/UserProps';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000'
});

export async function getCatalogFake() {
    const response = await api.get("/products");
    return response.data;
}

export async function getUserFake(): Promise<UserData>{
    const response = await api.get("/users/1");
    const data = response.data;
        
    const userData = {
        name: data.name,
        points: data.points,
        quantity: data.quantity,
        isAdmin: data.is_admin,
    }
    return userData;
}
