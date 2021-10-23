import React, { useContext, useEffect, useState } from 'react';
import { 
    Alert, 
    Image, 
    Platform, 
    StyleSheet, 
    View, 
    Button, 
    Text,
    TouchableOpacity
} from 'react-native';
import Background from '../components/Background';
import Header from '../components/header';
import TextField from '../components/TextField';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';
import fonts from '../styles/fonts';
import { createProduct } from '../services/ProductService';
import UserContext from '../contexts/UserContext';

export default function NewProduct(){
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [points, setPoints] = useState(0);

    const {token} = useContext(UserContext);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function handleChangeCode(code: string){
        setCode(code);
    }

    function handleChangeName(name: string){
        setName(name);
    }

    function handleChangeType(type: string){
        setType(type);
    }

    function handleSetPoints(points: number){
        setPoints(points)
    }

    async function registerProduct(){
        const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
        const body = {
            code,
            name,
            type,
            points,
            imageData: base64,
        }
        const response = await createProduct(token, body);

        if(response){
            Alert.alert("Produto criado com sucesso!")
        } else{
            Alert.alert("Falha no cadastro, tente novamente")
        }
    }

    return (
        <Background>
            <Header> Novo Produto</Header>
            <View
                style={styles.imgUploadView}
            >
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.button}
                >
                    {image? (
                            <Image source={{ uri: image }} style={{ resizeMode: 'cover', width: '100%', height: '100%'}} />
                        ):
                            <Icon 
                                name="upload"
                                size={32}
                            />
                    }
                </TouchableOpacity>
                <Text
                    style={{fontFamily: fonts.text,color: colors.green_text, fontSize: 16}}
                >
                    Imagem do Produto
                </Text>
            </View>
            <TextField 
                placeholder="Código do Produto"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangeCode(text)}
            />
            <TextField 
                placeholder="Nome"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangeName(text)}
            />
            <TextField 
                placeholder="Material"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangeType(text)}
            />
            <TextField 
                placeholder="Pontos"
                returnKeyType="next"
                onChangeText={(text: number) => handleSetPoints(text)}
            />
            
            <Button 
                color={colors.green_light}
                title="Cadastrar"
                onPress={registerProduct}
            />
        </Background>
    )
}

const styles = StyleSheet.create({
    imgUploadView: {
        width: '100%', 
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    button: {
        backgroundColor: colors.background_gray_light,
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
})