import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'


export default function TextInput({ errorText, description, ...props }){
  
  return (
    <View style={styles.container}>
        <Input
        style={styles.input}
        mode="flat"
        {...props}
        theme={{colors: {primary: '#31ce8c', underlineColor: 'transparent'}}}
        />
        {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
        ) : null}
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    
  },
  description: {
    fontSize: 13,
    color: '#FFF',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '#d13b27',
    paddingTop: 8,
  },
})
