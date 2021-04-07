import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api';
import UserContext from '../contexts/UserContext';

export default function ReadCodebar({navigation}){
    const [hasPermission, setHasPermission] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [success, setSuccess] = useState(true);
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

        setScanned(true);
        
        const url = '/insert/item/inventory';
        let body = {
            "id_item": `${data}`,
            "id_bin": '1',
        }

        const token = await getToken();
        
        header = {'headers':
        {"Content-Type": "application/json",
            "Authorization": token}
        }

        const response = await api.post(url, body, header);

        if(response.status == 200) {
            setSuccess(true)
            navigation.navigate("Meus descartes")
        }else{
            setSuccess(false)
        }
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                type={BarCodeScanner.Constants.Type.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            
            {scanned && 
                <Button 
                    style={{backgroundColor:'#31ce8c',}} 
                    title={'Toque para escanear novamente'} 
                    onPress={() => 
                        setScanned(false)
                    } 
                />
            }

            {hasPermission === null
                ? <Text style={styles.text}>Requisitando permissão para acessar a câmera</Text>
                
                : undefined
            }

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