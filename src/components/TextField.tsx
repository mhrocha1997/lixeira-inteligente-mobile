import React, { useState } from 'react'
import { 
    View, 
    StyleSheet,
    Text, 
    TextInput 
} from 'react-native'


export default function TextField({ label, ...inputProps}: any){
  
  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}    
            {...inputProps}
            placeholderTextColor={'gray'}
        />
        <Text style={styles.error}>
            {inputProps.error}
        </Text>
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
        padding: 8,
        height: 45,
        fontSize: 16
    },
    error: {
        fontSize: 10,
        color: '#ff0000',
    }
})
