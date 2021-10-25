import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Trash from '../components/Trash';
import UserContext from '../contexts/UserContext';
import getAllContainers from '../services/ContainerService';
import { ContainerProps } from '../types/ContainerProps';

export default function ContainerControl(){
    const [containers, setContainers] = useState<ContainerProps[]>([]);

    const {token} = useContext(UserContext);

    useEffect(()=>{
        async function fetchcontainers(){
            const containers = await getAllContainers(token);
            setContainers(containers);
        }
        fetchcontainers();
    }, []);
    
    return (
        <View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                data = {containers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (

                    <Trash
                        id={item.id}
                        name={item.name}
                        totalCapacity={item.totalCapacity}
                        usedCapacity={item.usedCapacity}
                        status={item.status}
                    />
                )}
            />
        </View>
    );
}