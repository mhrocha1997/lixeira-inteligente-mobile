import React, {useContext} from 'react';

import {Text, SafeAreaView, Image, View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import UserContext from '../contexts/UserContext';

export default function Profile({navigation}){

    const { token } = useContext(UserContext);

    useEffect(() => {
        async function getPoints(){
            const response =  await api.get('/get/user', {'headers': {'Authorization': token}});
            console.log(response)
            setPoints(response.data.data[0].points);
        }
        getPoints();
    },[])

    let points = getPoints();

    console.log("PONTOS:",points)
    return (
        <SafeAreaView>
            <LinearGradient colors={['rgba(34,193,195,1)', 'rgba(49,206,140,1)']}>
                <View style={styles.userView}>
                    <Image style={styles.profileImg}source={require('../assets/profile.png')}/>
                    <Text>username</Text>
                </View>
                <View style={styles.info}>
                    <Text> {points} xp</Text>
                    <Text> 6 itens descartados</Text>
                </View>
            </LinearGradient>
            
        </SafeAreaView>
    )
}

const width = 75;

const styles = StyleSheet.create({
    
    userView:{
        flexDirection: 'row',
        height: 200,
        alignItems: 'center',
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
    }
})