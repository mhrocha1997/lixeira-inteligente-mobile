import React, { useContext, useEffect, useState } from 'react';
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
import { getContainer } from '../services/ContainerService';

export default function Container({
    id,
    name,
    totalCapacity,
    usedCapacity,
    capacityStatus,
    updatedAt,
    location
}: ContainerProps){
    const [usedCapacityState, setUsedCapacity] = useState(usedCapacity);
    const [lastActivity, setActivity] = useState(0);
    const [timeType, setTimeType] = useState('');

    function updateActivity(updatedAt: string){
        const lastUpdate = new Date(updatedAt);
        lastUpdate.setHours(lastUpdate.getHours() - 3);
        
        const now = new Date();

        const delta = now.getTime() - lastUpdate.getTime();
        const days = Math.round(delta/(1000*60*60*24));
        
        if (days < 1){
            let hours = Math.round(delta/(1000*60*60));
            if(hours<1){
                let minutes = Math.round(delta/(1000*60));
                setActivity(minutes);
                if ( minutes == 1){
                    setTimeType('minuto');
                }else{
                    setTimeType('minutos');
                }
            }else{
                setActivity(hours);

                if(hours == 1){
                    setTimeType('hora');
                }else{
                    setTimeType('horas');
                }
            }
        }else{
            setActivity(days);
            if (days == 1) {
                setTimeType('dia')
            }else{
                setTimeType('dias')
            }
        }

    }

    useEffect(() => {
        updateActivity(updatedAt);
    }, [])

    const switchImage: any = {
        ok: trashOk,
        warning: trashWarning,
        alert: trashAlert,
    }
    const {getToken} = useContext(UserContext);

    async function locateContainer(){
        const query = `${location.street} ${location.district} ${location.city} ${location.state} ${location.cep}`
        Linking.openURL(`https://maps.google.com?q=${query}`);
    }

    async function checkActivity(){
        const token = await getToken();
        const container = await getContainer(id, token);
        updateActivity(container.updatedAt)
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
                        onPress={checkActivity}
                    >
                        <View style={styles.activityCard}>
                            <Icon name='activity' size={24} color='#2D7B5A'/>

                            <Text style={styles.textCards}>{lastActivity} {timeType} {"\n"} atrás</Text>

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
                    <Text style={styles.descriptionText}>Ocupação: {usedCapacity}%</Text>
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
        fontSize: 24,
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
        marginVertical: 8,
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
        fontSize: 16,
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
        fontSize: 20,
    },
})