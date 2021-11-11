import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Button, Alert, Image } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../contexts/UserContext";
import { getProductByCode } from "../services/ProductService";
import { addDiscard } from "../services/InventoryService";
import ProductsContext from "../contexts/ProductsContext";

export default function ReadCodebar() {
	const [hasPermission, setHasPermission] = useState(true);
	const [isScanned, setIsScanned] = useState(false);

	const { getToken, userId, handleUserInfoUpdate } = useContext(UserContext);
    const { handleDiscardSucceeded } = useContext(ProductsContext);

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

	const handleBarCodeScanned = async (code: string) => {
		setIsScanned(true);

		try {
            const token = await getToken()
			const productId = await getProductByCode(token, code);
            
            if (!Boolean(productId)){
                Alert.alert("Produto não consta no catálogo. Descarte um produto existente!", "", [
                    {
                        text: "OK",
                        style: "cancel",
                        onPress: () => {
                            setIsScanned(false);
                        },
                    },
                ])
            }else{
                const response = await addDiscard(token, userId, productId);
                if (Boolean(response)) {
                    setIsScanned(true);
                    Alert.alert("Produto descartado com sucesso!", "Você deseja:", [
                        {
                            text: "Descartar mais",
                            style: "cancel",
                            onPress: () => {
                                handleDiscardSucceeded();
                                handleUserInfoUpdate();
                                setIsScanned(false);
                            },
                        },
                        {
                            text: "Ver seus descartes",
                            onPress: () => {
                                setIsScanned(false);
                                handleDiscardSucceeded();
                                handleUserInfoUpdate();
                                navigation.navigate("Perfil");
                            },
                        },
                    ]);
                }
            }
		} catch (e) {
			console.error(e);
            Alert.alert("Não foi possível concluir o descarte, tente novamente!", "", [
                        {
                            text: "OK",
                            style: "cancel",
                            onPress: () => {
                                setIsScanned(false);
                            },
                        },
                        
                    ]);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<BarCodeScanner
				type={BarCodeScanner.Constants.Type.back}
				onBarCodeScanned={({ data }) =>
					!isScanned && handleBarCodeScanned(data)
				}
				style={StyleSheet.absoluteFill}
                
			/>
            <Image style={styles.frame} source={require('../assets/barcode_frame.png')}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		justifyContent: "center",
	},
	text: {
		color: "white",
	},
    frame: {
        alignSelf: 'center',
        width: '100%',
        height: '40%',
        resizeMode: 'contain',
    }
});
