import React from 'react';
import { View, Text, TouchableHighlight, Image, Linking,StyleSheet } from 'react-native';

export default function Product({image, description, title, points }) {
    let base64Image = `data:image/png;base64,${image}`;
    return (
        <View style={styles.centeredView}>
            <View style= {styles.cardView}>

                <View style={styles.infoView}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.descriptionText}>Material: {description}</Text>
                    <Text style={styles.pointsText}>{points} pontos</Text>
                </View>
                <Image source={{uri: base64Image}} style={styles.productImage}/>

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
        justifyContent: 'center',
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
        width: '80%',
        minHeight: 150
    },
    infoView: {
        flex: 1,
    },
    productImage: {
        width: null,
        height: null,
        flex:1,
        resizeMode: 'contain'
    },

    descriptionText: {
        flex: 1
    },

    titleText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 5
    },

    pointsText: {
        color: "#31ce8c",
        fontWeight: "bold",
        fontSize: 16,
        margin: 5
    },


})