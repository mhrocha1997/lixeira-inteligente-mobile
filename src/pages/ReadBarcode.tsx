import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Button, Alert } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

import api from "../services/api";
import UserContext from "../contexts/UserContext";

export default function ReadCodebar() {
  const [hasPermission, setHasPermission] = useState(true);
  const [isScanned, setIsScanned] = useState(false);

  const { token } = useContext(UserContext);

  const navigation = useNavigation();

  // Checando permissão da câmera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status == "granted") {
        setHasPermission(true);
      }
    })();
  }, []);

  const handleBarCodeScanned = async ( data: string ) => {
    setIsScanned(true);
    
    const url = "/insert/item/inventory";
    
    let body = {
      id_item: `${data}`,
      id_bin: "1",
    };

    const header = {
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    try {
      const response = await api.post(url, body, header);
      console.log(response)
      if (response.status == 200) {
        setIsScanned(true);
        Alert.alert('Produto descartado com sucesso!','Você deseja:',[
          {
            text: 'Descartar mais',
            style: 'cancel',
            onPress: () => {
              setIsScanned(false);
            }
          },
          {
            text: 'Ver seus descartes',
            onPress: () => {
              setIsScanned(false)
              navigation.navigate("Perfil")
            }
          }
        ])
        
      }

    }catch(e){
      console.log(e);
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        type={BarCodeScanner.Constants.Type.back}
        onBarCodeScanned={({data}) => !isScanned && handleBarCodeScanned(data)}
        style={StyleSheet.absoluteFillObject}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
