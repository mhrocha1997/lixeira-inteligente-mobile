import React from 'react';
import { 
    Image,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import CardView from './CardView';

import profile from '../assets/profile.png';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { UserData } from '../types/UserProps';

export default function User({
    name,
    discards,
    points,
    role,
    id
}: UserData){
    return (
        <CardView>
            <View 
                style={styles.profileView}
            >
                <Image source={profile} style={styles.profileImg}/>
                <View style={styles.infoView}>
                    <Text style={styles.nameText}>
                        {name}
                    </Text>
                    <View style={styles.scoreView}>
                        <Text style={styles.infoText}>
                            {points} xp
                        </Text>
                        <Text style={styles.infoText}>
                            {discards} Descartes
                        </Text>
                    </View>
                </View>
            </View>
        </CardView>
    );
}

const styles = StyleSheet.create({
    profileView: {
        alignItems: 'center',
        flex: 1,
    },
    profileImg: {
        borderRadius: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 2,
    },
    infoView: {
        flex: 1,
        width: '100%',
        height: '90%',
        alignItems: 'center',
        marginBottom: 10,
    },
    nameText: {
        fontFamily: fonts.title,
        color: colors.green_text,
        fontWeight: "bold",
        fontSize: 20,
        flex: 1
    },
    scoreView: {
        flexDirection: 'row', 
        flex: 1, 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        fontFamily: fonts.text,
        color: colors.green_text,
        fontSize: 18,
        marginHorizontal: 15,
    },
})