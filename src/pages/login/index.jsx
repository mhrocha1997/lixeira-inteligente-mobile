import React from 'react';
import {View, Image, Text, TouchableOpacity, Flatlist, Linking} from 'react-native';
import logoImg from '../../assets/logo.jpg';
import styles from './styles';

export default function Login(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity>

                </TouchableOpacity>

            </View>
        </View>
    )
}