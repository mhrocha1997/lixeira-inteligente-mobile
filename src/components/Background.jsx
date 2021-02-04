import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styles from '../Styles/style';

export default function Background({ children }){
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
    </KeyboardAvoidingView>
}
