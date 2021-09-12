import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

type Children = {
    children: ReactNode;
  };

export default function CardView({children}: Children){
    return (
        <View style={styles.centeredView}>
            <View style={styles.cardView}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
      justifyContent: "space-between",
    },
    cardView: {
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: colors.background_gray_light,
      borderRadius: 15,
      padding: 15,
      shadowColor: "#31ce8c",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: "85%",
      minHeight: 150,
    },
  });