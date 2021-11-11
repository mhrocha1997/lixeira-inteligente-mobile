import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import Product from "../components/Product";
import { FlatList } from "react-native-gesture-handler";
import UserContext from "../contexts/UserContext";
import { ProductProps } from "../types/ProductProps";
import Icon from "react-native-vector-icons/Feather";
import NewProduct from "../components/NewProduct";
import { getCatalog } from "../services/ProductService";

export default function Catalog() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    let { role, getToken } = useContext(UserContext);

    function handleAddProduct(){
        setModalVisible(true);
    }

    useEffect(() => {
        async function fetchProducts(){
            const token = await getToken();
            const products = await getCatalog(token);
            setProducts(products);
        }
        fetchProducts();
    }, []);

    const closeModal = useCallback(event => {
        setModalVisible(false);
    },[isModalVisible]);

    return (
        <SafeAreaView >
            {products != [] ? (
            <FlatList
                style={{height: '100%'}}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <Product
                    id={item.id}
                    imageData={item.imageData}
                    name={item.name}
                    type={item.type}
                    points={item.points}
                    discards={item.discards}
                />
                )}
            />
            ) : (
            <Text> Ainda não há produtos cadastrados</Text>
            )}
            {role == 'ADMIN' ? (
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
                    onPress={handleAddProduct}
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
                <NewProduct 
                    callbackFunction={closeModal}
                />
            </Modal>
            
        </SafeAreaView>
    );
}
