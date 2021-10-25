import React, {useContext, useEffect, useState} from 'react';

import {Text, SafeAreaView, Image, View, StyleSheet, FlatList} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import UserContext from '../contexts/UserContext';
import ProductsContext from '../contexts/ProductsContext';
import Product from '../components/Product'
import { UserData } from '../types/UserProps';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { getUserData } from '../services/UserService'

export default function Profile(){
    const [ userData, setUserData] = useState({} as UserData)

    const {token, points, discardNumber} = useContext(UserContext);
    const { discards } = useContext(ProductsContext);
    
    useEffect(() => {
        async function fetchUserData(){
            const data = await getUserData(token);
            setUserData(data);
        }
        fetchUserData();
    },[])

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
                            {points} xp
                        </Text>
                    </View>

                    <View 
                        style={{flexDirection: 'column', alignItems: 'center'}}
                    >
                        <Text 
                            style={styles.details}
                        >
                                {discardNumber} Descartes
                        </Text>
                    </View>
                </View>
            </LinearGradient>


            <View>
            { discards!=[] ?(
                <FlatList
                    data={discards}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Product
                        id={item.id}
                        imageData={item.product.imageData}
                        name={item.product.name}
                        type={item.product.type}
                        points={item.points}
                        discards={item.discards}
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