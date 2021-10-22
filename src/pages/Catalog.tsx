import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import Product from "../components/Product";
import { FlatList } from "react-native-gesture-handler";
import UserContext from "../contexts/UserContext";
import { ProductProps } from "../types/ProductProps";
import { getCatalogFake } from "../services/fake_api";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import NewProduct from "./NewProduct";

export default function Catalog() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const { role } = useContext(UserContext);
    const navigation = useNavigation();

    function handleAddProduct(){
        setModalVisible(true);
    }

    useEffect(() => {
        console.log("role:",role)
        async function fetchProducts(){
        // let products = await getCatalog();
        let products = await getCatalogFake();
        setProducts(products);
        }
        fetchProducts();
    }, []);

    return (
        <SafeAreaView >
            {products != [] ? (
            <FlatList
                style={{height: '100%'}}
                data={products}
                keyExtractor={(item) => item.id_item.toString()}
                renderItem={({ item }) => (
                <Product
                    id_item={item.id_item}
                    img_base64={item.img_base64}
                    name={item.name}
                    material={item.material}
                    points={item.points}
                    quantity={0}
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
                transparent={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!isModalVisible);
                  }}
            >
                <NewProduct />
            </Modal>
            
        </SafeAreaView>
    );
}
