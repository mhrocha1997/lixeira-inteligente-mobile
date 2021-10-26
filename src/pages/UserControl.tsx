import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import User from '../components/User';
import { UserData } from '../types/UserProps';
import { getAllUsers } from '../services/UserService';
import UserContext from '../contexts/UserContext';

export default function UserControl(){
    const [users, setUsers] = useState<UserData[]>([]);

    const { token } = useContext(UserContext);
    
    useEffect(()=>{
        async function fetchUsers(){
            const users_response = await getAllUsers(token);
            setUsers(users_response);
        }
        fetchUsers();
    }, [])

    return (
        <SafeAreaView>
            {users != [] ? (
                <FlatList
                    style={{height: '100%'}}
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <User
                        id={item.id}
                        name={item.name}
                        points={item.points}
                        discards={item.discards}
                        role={item.role}
                        profileImage={item.profileImage}
                    />
                    )}
                />
                ) : (
                <Text> Ainda não há usuários cadastrados</Text>
            )}
        </SafeAreaView>
    )
}