import {StyleSheet} from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF'
    },

    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: '#000000',
        primary: '#560CCE',
        secondary: '#414757',
        error: '#f13a59',
    },

})

