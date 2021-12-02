import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NewContainer from '../components/NewContainer';
import Container from '../components/Container';
import UserContext from '../contexts/UserContext';
import { getAllContainers } from '../services/ContainerService';
import { ContainerProps } from '../types/ContainerProps';

export default function ContainerControl() {
    const [containers, setContainers] = useState<ContainerProps[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const { getToken, role } = useContext(UserContext);

    async function fetchcontainers() {
        const token = await getToken();
        const containers = await getAllContainers(token);
        setContainers(containers);
    }

    useEffect(() => {
        fetchcontainers();
    }, []);

    function handleAddContainer() {
        setModalVisible(true);
    }
    const closeModal = useCallback(event => {
        setModalVisible(false);
        fetchcontainers();
    }, [isModalVisible]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                data={containers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Container
                        id={item.id}
                        name={item.name}
                        totalCapacity={item.totalCapacity}
                        usedCapacity={item.usedCapacity}
                        capacityStatus={item.capacityStatus}
                        updatedAt={item.updatedAt}
                        location={item.location}
                    />
                )}
            />

            {role == 'ADMIN'
                ? (
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70,
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            height: 70,
                            backgroundColor: '#fff',
                            borderRadius: 100,
                        }}
                        onPress={handleAddContainer}
                    >
                        <Icon name='plus' size={30} color='#01a699' />
                    </TouchableOpacity>
                )
                : null

            }


            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <NewContainer
                    callbackFunction={closeModal}
                />
            </Modal>
        </View>
    );
}