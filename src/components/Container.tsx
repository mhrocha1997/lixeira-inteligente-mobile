import React, { useContext, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    Linking
} from 'react-native';
import CardView from './CardView';

import trashOk from '../assets/trashOk.png';
import trashWarning from '../assets/trashWarning.png';
import trashAlert from '../assets/trashAlert.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/Feather';
import { ContainerProps } from '../types/ContainerProps';
import { Card } from 'react-native-paper';
import UserContext from '../contexts/UserContext';
import { getLocationLink } from '../services/ContainerService';

export default function Container({
    id,
    name,
    totalCapacity,
    usedCapacity,
    capacityStatus
}: ContainerProps){
    const switchImage: any = {
        ok: trashOk,
        warning: trashWarning,
        alert: trashAlert,
    }
    const {getToken} = useContext(UserContext);

    async function locateContainer(){
        const token = await getToken();
        console.log("token", token )
        const location = await getLocationLink(id, token);
        const query = `${location.street} ${location.district} ${location.city} ${location.state} ${location.cep}`
        Linking.openURL(`https://maps.google.com?q=${query}`);
    }

    return (
        <CardView>
            <View style={{width: '35%'}}>
                <Image 
                    source={switchImage[capacityStatus]} 
                    style={styles.trashImg}
                />
            </View>
            <View style={styles.infoView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{name}</Text>
                </View>
                <View style={styles.buttonsView}>
                    <Card
                        style={styles.interactCards}
                    >
                        <View style={styles.activityCard}>
                            <Icon name='activity' size={24} color='#2D7B5A'/>
                            <Text style={styles.textCards}>2 horas {"\n"} atrás</Text>

                        </View>
                    </Card>

                    <Card
                        onPress={locateContainer}
                        style={styles.interactCards}
                    >
                        <View style={styles.locationCard}>
                            <Icon name='map-pin' size={24} color='#31CE8C' />
                            <Text style={styles.textCards}>Localização</Text>

                        </View>
                    </Card>

                </View>

                <View style={styles.descriptionView}>
                    <Text style={styles.descriptionText}>Capacidade Total: {totalCapacity}</Text>
                    <Text style={styles.descriptionText}>Ocupação: {usedCapacity}</Text>
                </View> 
            </View>
        </CardView>
    );
}

const styles = StyleSheet.create({
    trashImg: {
        alignSelf: 'center',
        resizeMode: 'contain',
        flex: 1,
        width: '75%'
    },
    infoView: {
        flex: 1,
        justifyContent: 'center',
    },
    titleView: {
        flexDirection: 'row', 
        flex: 1, 
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        color: colors.green_text,
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5,
        fontFamily: fonts.title,
    },
    buttonsView :{
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 2,
    },
    interactCards:{
        height: '100%',
        margin: 3,
        width: '45%',
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: colors.background_white,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 20,
    },

    activityCard :{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
    },
    locationCard:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        height: '100%',
    },
    textCards: {
        fontSize: 15,
        fontFamily: fonts.text,
        color: colors.green_text,
    },
    locationImg: {
        width: '8%',
        resizeMode: 'contain'
    },
    descriptionView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    descriptionText: {
        fontFamily: fonts.text,
        color: colors.green_text,
        fontSize: 18,
    },
})