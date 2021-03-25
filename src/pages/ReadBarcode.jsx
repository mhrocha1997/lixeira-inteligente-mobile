import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

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

    // Pegando token
    useEffect(() => {
          try {
            console.log("lendo token...")
            const token =  AsyncStorage.getItem('token')
            if(token !== null) {
                // #TODO  Verificar se o token já expirou
                // Se já expirou, logar novamente,
                // caso contrário, prosseguir
            }
          } catch(e) {
            console.log("Erro ao ler o token");
          }
        },[])

    const handleBarCodeScanned = ({ data }) => {
        console.log("Leu o código");
        setScanned(true);
        
        const url = 'inset/item/inventory';
        
        let body = {
            "id_item": data,
            "id_bin": 12,
        }
        
        header = {'headers':
        {"Content-Type": "application/json",
            "Authorization": token}
        }

        const response = await api.post(url, body, header);
        
        response.status == 200 
            ? navigation.navigate("Meus descartes")
            : setSuccess(false);
        
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