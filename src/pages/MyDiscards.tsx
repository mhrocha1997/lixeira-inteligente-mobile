import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Product from '../components/Product';    
import Header from '../components/header';
import api from '../services/api';
import UserContext from '../contexts/UserContext';
import { ProductProps } from '../types/ProductProps';

export default function MyDiscards(){
  const [products, setProducts] = useState<ProductProps[]>([]);

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
                      img_base64={item.img_base64}
                      name={item.name}
                      material={item.material}
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


