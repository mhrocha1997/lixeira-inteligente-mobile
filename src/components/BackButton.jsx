import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {ArrowLeft} from 'react-native-feather';


export default function BackButton({ goBack }){
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <ArrowLeft />
    </TouchableOpacity>
  )
}
  

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  
})

