import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
} from 'react-native';
import CardView from './CardView';

import trashOk from '../assets/trashOk.png';
import trashWarning from '../assets/trashWarning.png';
import trashAlert from '../assets/trashAlert.png';

import location from '../assets/location.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/Feather';
import { ContainerProps } from '../types/ContainerProps';

export default function Container({
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
                    <Icon name='map-pin' size={26}/>
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