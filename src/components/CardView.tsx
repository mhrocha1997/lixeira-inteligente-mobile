import React, { Children, ReactNode } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

type Children = {
    children: ReactNode;
  };

export default function CardView({children, style}: any){
    return (
        <View style={styles.centeredView}>
            <View style={{...styles.cardView, ...style}}>
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
      marginBottom: 5,
      justifyContent: "space-between",
    },
    cardView: {
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: colors.background_gray_light,
      borderRadius: 15,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
      width: "85%",
      minHeight: 150,
    },
  });