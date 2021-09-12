import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Trash from '../components/Trash';
import { getTrashesFake } from '../services/fake_api';
import { TrashProps } from '../types/TrashProps';

export default function TrashControl(){
    const [trashes, setTrashes] = useState<TrashProps[]>([]);

    useEffect(()=>{
        console.log("useEffect")
        async function fetchTrashes(){
            console.log('trashes')
            let trashes = await getTrashesFake();
            console.log(trashes);
            setTrashes(trashes);
        }
        fetchTrashes();
    }, [])
    // const trashes = Array.from(Array(10).keys())
    return (
        <View>
            <FlatList
                data = {trashes}
                renderItem={({item}) => (
                    <Trash 
                        title={item.title}
                        capacity={item.capacity}
                        occupation={item.occupation}
                        status={item.status}
                    />
                )}
            />
        </View>
    );
}