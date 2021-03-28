import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api';

export default function ReadCodebar({navigation}){
    const [hasPermission, setHasPermission] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [success, setSuccess] = useState(true);

    // Checando permissão da câmera
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log("Status da permissão: ", status);
            if(status == 'granted'){
                setHasPermission(status);
            }
          })();
    },[])

    async function getToken(){
        try {
            console.log("lendo token...");
            const token = await AsyncStorage.getItem('token');
            if(token !== null) {
                const response = await api.get('/token', {'headers': {"Authorization": token}});
    
                if(response.status != 200){
                    navigation.navigate("Login");
                }else{
                    return token;
                } 
    
            }   
        } catch(e) {
        console.log("Erro ao ler o token", e);
        }
    }
        
    

    const handleBarCodeScanned = async ({ data }) => {
        console.log("Leu o código");

        setScanned(true);
        
        const url = '/insert/item/inventory';
        console.log(data);
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

            {success
                ? <Text> Produto ainda não disponível</Text>
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