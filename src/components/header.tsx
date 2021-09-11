import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Header(props){
    return (
        <Text style={styles.header} {...props} />
    );       
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: colors.green_light,
    fontWeight: 'bold',
    paddingVertical: 12,
    fontFamily: fonts.title,
  },
})
