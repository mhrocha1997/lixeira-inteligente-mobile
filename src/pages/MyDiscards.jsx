import React, { Fragment, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Product from '../components/Product';    
import Header from '../components/header';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../contexts/UserContext';

export default function MyDiscards({navigation}){
  const [products, setProducts] = useState([]);

  const { token } = useContext(UserContext)

  async function getProducts(){
    const response = await api.get('/get/user/inventory', {'headers':{"Authorization": token}});
    setProducts(response.data.data);
  }
    useEffect(() => {
      getProducts();
    },[]);

    return (
        <SafeAreaView>
            <View>

              { products!=[] ?(
                  <FlatList
                    data={products}
                    keyExtractor={ (item) => item.id_item.toString()}
                    renderItem={({item}) => (
                    <Product 
                      image={item.img_base64}
                      title={item.name}
                      description={item.material}
                      points={item.points}
                      quantity={item.quantity}
                    />
                  )}
                />
                
                ):(
                  <Header> Ainda não há produtos cadastrados</Header>
                ) 
              }
            </View>
        </SafeAreaView>

    );
}


