import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import Product from '../components/Product';    
import Header from '../components/header';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';
import UserContext from '../contexts/UserContext';

export default function Catalog({navigation}){
  const [products, setProducts] = useState([]);

  const { token } = useContext(UserContext);

  async function getProducts(){
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
                      title={item.name}
                      description={item.material}
                      points={item.points}
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

