import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { UserData } from '../types/UserProps';

const api = axios.create({
    baseURL: 'http://15.228.21.150:443',
});

export async function getCatalog() {
    const { token } = useContext(UserContext);
    const response = await api.get(
        "/get/item/full", 
        {headers: { 
            "Content-Type": "application/json", 
            Authorization: token 
        }}
    );
    if (response.status == 200){
        return response.data.data;
    }else{
        return [];
    }
}

export async function getUserInventory() {
    const { token } = useContext(UserContext);
    const response = await api.get('/get/user/inventory', 
        {headers: { 
             Authorization: token,
        }
    });
    if (response.status == 200){
        return response.data.data;
    }else{
        return [];
    }
}

export async function getUserData(): Promise<UserData>{
        const { token } = useContext(UserContext);

        const response =  await api.get(
            '/get/user', 
            {'headers': {
                'Authorization': token
            }}
        );
        
        if (response.status == 200){
            const data = response.data.data;
    
            const userData = {
                name: data.name,
                points: data.points,
                quantity: data.quantity,
                isAdmin: data.is_admin,
            }
            return userData;
        }else{
            return {} as UserData;
        }
}

export async function verifyToken(token: string | null): Promise<boolean>{
    if (token !== null) {
        const response = await api.get("/token", {
            headers: { Authorization: token },
        });
        if (response.status == 200) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

export async function login(data: any){
        const response = await api.post(
            "/login/user",
            data,
            {headers: { 
                "content-type": "application/json" 
            },
        });
        
        if (response.status == 200){
            const token = response.data.data.token;
            return token
        }else{
            return ""
        }
}

export async function register(data: any){
    const response = await api.post(
        '/create/user',
        data,
        {headers: {
            'content-type': 'application/json'
        }}
    );
    if (response.status == 200){
        return true;
    }else{
        return false;
    }
}