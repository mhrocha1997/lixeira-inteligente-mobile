import React, { Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Product from '../components/Product';    
import Header from '../components/header';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';

export default function Catalog({navigation}){
  const [products, setProducts] = useState([]);

  
  const getToken = async () => {
    try {
      console.log("lendo token...")
      const token = await AsyncStorage.getItem('token')
      if(token !== null) {
        console.log("Token lido");
        return token;
      }
    } catch(e) {
      console.log("Erro ao ler o token");
    }
  }

  async function getProducts(){
    const token = await getToken();
    console.log("GET products",token);
    const response = await api.get('/get/item/full', {'headers':{"Content-Type": "application/json", "Authorization": token}});
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
                      title={item.nome}
                      description={item.material}
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

