import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

export default function Background({ children }){
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {children}
        </KeyboardAvoidingView>
    );
    
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0000',
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
