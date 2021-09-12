import axios from 'axios';
import { TrashProps } from '../types/TrashProps';
import { UserData } from '../types/UserProps';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/mhrocha1997/lixeira-inteligente-mobile'
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

export async function getTrashesFake(): Promise<TrashProps[]>{
    const response = await api.get('/trashes');
    console.log(response.status)
    if (response.status == 200){
        return response.data;
    }else{
        return { } as TrashProps[];
    }
}
