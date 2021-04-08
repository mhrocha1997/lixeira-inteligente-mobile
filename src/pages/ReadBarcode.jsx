import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import api from '../services/api';
import UserContext from '../contexts/UserContext';

export default function ReadCodebar({navigation}){
    const [hasPermission, setHasPermission] = useState(true);
    const { token } = useContext(UserContext);

    // Checando permissão da câmera
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            if(status == 'granted'){
                setHasPermission(status);
            }
          })();
    },[])

    const handleBarCodeScanned = async ({ data }) => {

        const url = '/insert/item/inventory';
        let body = {
            "id_item": `${data}`,
            "id_bin": '1',
        }

        header = {'headers':
        {"Content-Type": "application/json",
            "Authorization": token}
        }

        const response = await api.post(url, body, header);

        if(response.status == 200) {
            navigation.navigate("Perfil")
        }else{
            console.log("Erro na leitura")
        }
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                type={BarCodeScanner.Constants.Type.back}
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    text:{
        color: 'white'
    }
    
});