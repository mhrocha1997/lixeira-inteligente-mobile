import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000'
});

export async function getCatalogFake() {
    console.log("CHAMOU")
    const response = await api.get("/products");
    console.log(response.data)
    return response.data;
}
