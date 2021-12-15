import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import profile from '../assets/profile.png';
import { LinearGradient } from 'expo-linear-gradient';

import UserRank from '../components/UserRank';
import UserContext from '../contexts/UserContext';
import { getMonthlyRank, getAllTimeRank } from '../services/UserService';


export default function Ranking() {
    const [rankType, setRankType] = useState('monthly');
    const [montlhyRank, setMonthlyRank] = useState();
    const [alltimeRank, setAlltimeRank] = useState();
    const [rankData, setRankData] = useState();

    const data = [
        {
            "id": 1,
            "name": "Marcelo Rocha",
            "points": 500
        },
        {
            "id": 2,
            "name": "Lucas Borges",
            "points": 500
        },
        {
            "id": 3,
            "name": "Rodrigo Coelho",
            "points": 500
        },
        {
            "id": 4,
            "name": "Marcelo Rocha",
            "points": 500
        },
        {
            "id": 5,
            "name": "Lucas Borges",
            "points": 500
        },
        {
            "id": 6,
            "name": "Rodrigo Coelho",
            "points": 500
        },
        {
            "id": 7,
            "name": "Marcelo Rocha",
            "points": 500
        },
        {
            "id": 8,
            "name": "Lucas Borges",
            "points": 500
        },
        {
            "id": 9,
            "name": "Rodrigo Coelho",
            "points": 500
        },
        {
            "id": 10,
            "name": "Rodrigo Coelho",
            "points": 500
        },
        {
            "id": 11,
            "name": "Rodrigo Coelho",
            "points": 500
        }
    ]

    const { getToken } = useContext(UserContext);

    function setSelectedRanking(item: any) {
        setRankType(item)
    }

    async function fetchRankData() {
        const token = await getToken();
        const montlhyRank = await getMonthlyRank(token);
        const alltimeRank = await getAllTimeRank(token);
        console.log(alltimeRank)
        setMonthlyRank(montlhyRank);
        setAlltimeRank(alltimeRank);
    }

    useEffect(() => {
        fetchRankData();
    }, []);

    useEffect(() => {
        console.log(rankType)
        if (rankType == 'monthly') {
            setRankData(montlhyRank);
        } else if (rankType == 'alltime') {
            setRankData(alltimeRank);
        }
    }, [rankType])


    return (
        <>
            <LinearGradient
                colors={[colors.green_light, colors.green_dark]}
                style={styles.container}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', maxHeight: '80%' }}>
                    <View style={{ width: '35%', alignSelf: 'center' }}>
                        <Image style={styles.trophyImg} source={require('../assets/winner.png')} />
                    </View>
                    <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                        <Text style={styles.cardTitle}>Vencedor do Último Mês</Text>
                        <View style={styles.winnerView}>
                            <Image source={profile} style={styles.profileImg} />
                            <View>
                                <Text style={styles.winnerText}>João das Neves</Text>
                                <Text style={styles.winnerText}> 42xp</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.pickerView}>

                    <Picker
                        style={styles.picker}
                        selectedValue={rankType}
                        onValueChange={(itemValue) => {
                            setSelectedRanking(itemValue)
                        }
                        }
                        mode='dropdown'
                        enabled={true}
                        dropdownIconColor={colors.background_white}
                        dropdownIconRippleColor='#000'
                    >
                        <Picker.Item label="Ranking Mensal" value="monthly" style={styles.pickerItem} />
                        <Picker.Item label="Ranking Geral" value="alltime" style={styles.pickerItem} />
                    </Picker>

                </View>

            </LinearGradient>

            <View style={styles.otherPlayersView}>
                <View style={{ height: 600 }}>
                    {
                        rankType == 'monthly'
                            ? (
                                <FlatList
                                data={rankData}
                                contentContainerStyle={{ paddingBottom: 50 }}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                        (<UserRank
                                            index={index + 1}
                                            name={item.name}
                                            points={item.monthlyExp}
                                        />)
        
                                }
                            />
                            ): (
                                <FlatList
                                data={rankData}
                                contentContainerStyle={{ paddingBottom: 50 }}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                        (<UserRank
                                            index={index + 1}
                                            name={item.name}
                                            points={item.exp}
                                        />)
        
                                }
                            />
                            )
                    }
                   
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pickerView: {
        width: '50%',
        flexDirection: "row",
        alignSelf: 'center',
        backgroundColor: 'rgba(242, 242, 242, 0.2)',
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
    picker: {
        width: '100%',
        height: 50,
        color: 'white',
    },
    pickerItem: {
        fontFamily: fonts.title,
        fontSize: 20,
    },
    container: {
        backgroundColor: colors.green_dark,
        flexDirection: 'column',
        alignContent: 'flex-start',
        maxHeight: '40%',
        justifyContent: 'flex-start'
    },
    trophyImg: {
        resizeMode: 'contain',
        width: '100%',
        height: '80%'
    },
    cardTitle: {
        color: 'white',
        fontFamily: fonts.title,
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    profileImg: {
        borderRadius: 50,
        height: 50,
        width: 50,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        marginRight: 6
    },
    winnerView: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: 60,
    },
    winnerText: {
        fontFamily: fonts.text,
        fontSize: 22,
        color: 'white',
    },
    otherPlayersView: {
        flex: 1,
        flexGrow: 1,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        position: 'absolute',
        backgroundColor: colors.background_white,
        width: '100%',
        marginTop: '55%',
        marginBottom: 200
    },
    otherPlayers: {
        maxHeight: 20,
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 8,
    }
})