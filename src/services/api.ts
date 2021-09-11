import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const api = axios.create({
    baseURL: 'http://15.228.21.150:443',
});

export async function getCatalog() {
    const { token } = useContext(UserContext);
    const response = await api.get("/get/item/full", {
        headers: { "Content-Type": "application/json", Authorization: token },
    });
    return response.data.data;
}
