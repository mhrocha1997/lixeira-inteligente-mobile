import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Trash from '../components/Trash';
import { getTrashesFake } from '../services/fake_api';
import { TrashProps } from '../types/TrashProps';

export default function TrashControl(){
    const [trashes, setTrashes] = useState<TrashProps[]>([]);

    useEffect(()=>{
        async function fetchTrashes(){
            let trashes = await getTrashesFake();
            setTrashes(trashes);
        }
        fetchTrashes();
    }, [])
    return (
        <View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                data = {trashes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Trash
                        id={item.id}
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