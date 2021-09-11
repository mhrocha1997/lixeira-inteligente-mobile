import React, {useContext, useEffect, useState} from 'react';

import {Text, SafeAreaView, Image, View, StyleSheet, FlatList} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import UserContext from '../contexts/UserContext';
import Product from '../components/Product'
import { ProductProps } from '../types/ProductProps';
import { UserData } from '../types/UserProps';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {getUserInventory, getUserData} from '../services/api'
import { getCatalogFake, getUserFake } from '../services/fake_api';

export default function Profile(){
    const [ userData, setUserData] = useState({} as UserData)
    const [ products, setProducts] = useState<ProductProps[]>([])
    
    useEffect(() => {
        async function fetchUserData(){
            const data = await getUserFake();
            // const data = await getUserData();
            setUserData(data);
        }
        fetchUserData();
    },[])

    async function getProducts(){
        // const products = await getUserInventory();
        const products = await getCatalogFake();
        setProducts(products);
    }
    useEffect(() => {
      getProducts();
    },[]);

    return (
        <SafeAreaView style={styles.screen}>
            <LinearGradient 
                colors={[colors.green_light, colors.green_dark]} 
                style={styles.container}
            >
                <View style={styles.userView}>
                    <View style={{flexDirection: 'column'}}>
                        <Text 
                            style={styles.userName}
                        >
                            Olá, {userData.name}
                        </Text>

                        <Text 
                            style={styles.details}
                        >
                            Esse é o seu resumo
                        </Text>
                    </View>
                    <Image 
                        style={styles.profileImg}
                        source={require('../assets/profile.png')}
                    />
                </View>
                <View style={styles.info}>
                    <View 
                        style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                        <Text 
                            style={styles.details}
                        >
                            {userData.points} xp
                        </Text>
                    </View>

                    <View 
                        style={{flexDirection: 'column', alignItems: 'center'}}
                    >
                        <Text 
                            style={styles.details}
                        >
                                {userData.quantity} Descartes
                        </Text>
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
        backgroundColor: colors.background_white,
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
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    userView:{
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 2,
        marginTop: 10
    },
    userName:{
        fontSize: 25,
        color: '#f2f3f5',
        fontFamily: fonts.title,
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
        fontFamily: fonts.text
    },
})