import { ContainerProps } from '../types/ContainerProps';
import api from './api';

export default async function getAllContainers(token: string){
    const response = await api.get('/containers',
        {'headers': {
            'Authorization': `Bearer ${token}`,
        }}
    );

    if(response.status == 200){
        return response.data.found.containers as ContainerProps[];
    }else{
        return [] as ContainerProps[];
    }
}