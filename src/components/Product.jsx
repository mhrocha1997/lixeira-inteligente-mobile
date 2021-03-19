import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, Linking,StyleSheet } from 'react-native';

export default function Product({image, description, title }) {
    let base64Image = `data:image/png;base64,${image}`;
    return (
        <View style={styles.centeredView}>
            <View style= {styles.cardView}>

                <Image source={{uri: base64Image}} style={styles.productImage}/>
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                    <Text style={styles.pointsText}>10 pontos</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        justifyContent: 'space-between'
    },
    
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#31ce8c",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '94%',
        minHeight: 150
    },
    
    productImage: {
        width: '50%',
        height: '50%'
    },

    descriptionText: {
        flex: 1
    },

    titleText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
        margin: 5
    },

    pointsText: {
        color: "#31ce8c",
        fontWeight: "bold",
        fontSize: 16,
        margin: 5
    },


})