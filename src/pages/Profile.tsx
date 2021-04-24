import React, {useContext, useEffect, useState} from 'react';

import {Text, SafeAreaView, Image, View, StyleSheet, FlatList} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import UserContext from '../contexts/UserContext';
import Product from '../components/Product'
import { ProductProps } from '../types/ProductProps';

import api from '../services/api'

type UserData = {
    name: string;
    quantity: number;
    points: number;
}

export default function Profile(){
    const [ userData, setUserData] = useState({} as UserData)
    const [ products, setProducts] = useState<ProductProps[]>([])
    
    const { token } = useContext(UserContext);

    useEffect(() => {
        async function getUserData(){
            const response =  await api.get('/get/user', {'headers': {'Authorization': token}});
            
            const data = response.data.data[0]
            
            let quantity = 0;
            products.map((product: ProductProps) =>{
                quantity += product.quantity
            })

            setUserData({
                name: data.name,
                points: data.points,
                quantity: quantity
            })
        }
        getUserData();
    },[])

    async function getProducts(){
        const response = await api.get('/get/user/inventory', {'headers':{"Authorization": token}});
        setProducts(response.data.data);
    }
    useEffect(() => {
      getProducts();
    },[]);

    return (
        <SafeAreaView style={styles.screen}>
            <LinearGradient colors={['#31ce8c', '#50b69b']} style={styles.container}>
                <View style={styles.userView}>
                    <Image style={styles.profileImg}source={require('../assets/profile.png')}/>
                    <Text style={styles.userName}>{userData.name}</Text>
                </View>
                <View style={styles.info}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.details}>{userData.points} </Text>
                        <Text style={{fontSize: 12, color:'white'}}>xp</Text>
                    </View>

                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.details}> {userData.quantity} </Text>
                        <Text style={{fontSize: 12, color:'white'}}>Descartes</Text>
                    </View>
                </View>
            </LinearGradient>


            <View>
            { products!=[] ?(
                <FlatList
                    data={products}
                    keyExtractor={ (item) => item.id_item.toString()}
                    renderItem={({item}) => (
                        <Product
                        id_item={item.id_item}
                        img_base64={item.img_base64}
                        name={item.name}
                        material={item.material}
                        points={item.points}
                        quantity={item.quantity}
                        />
                    )}
                />
                ): undefined }
            </View>
            
        </SafeAreaView>
    )
}

const width = 50;

const styles = StyleSheet.create({
    screen :{
        backgroundColor: '#f2f3f5',
        flex: 1
    },
    container :{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 8,
    },
    userView:{
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        padding: 2,
        marginTop: 10
    },
    userName:{
        fontSize: 18,
        color: '#f2f3f5',
    },
    profileImg: {
        borderRadius: width,
        width: width,
        resizeMode: 'contain',
        margin: 10
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        marginBottom: 10,
    },
    details: {
        color: 'white',
        fontSize: 20,
        
    }
})