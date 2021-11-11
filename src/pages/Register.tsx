import React, {useEffect, useState} from 'react';
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Logo from '../components/Logo';
import Background from '../components/Background';
import Header from '../components/header';
import TextField from '../components/TextField';
import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import profile from '../assets/profile.png';

import {signup} from '../services/UserService';
import Validator from '../utils/Validator';
import Icon from 'react-native-vector-icons/Feather';

export default function Register({navigation} : any){
    const [ name, setName] = useState({value: '', error: ''})
    const [ email, setEmail] = useState({value: '', error: ''})
    const [image, setImage] = useState('');
    const [ password, setPassword] = useState({value: '', error: ''})
    const [ passwordConfirmation, setPasswordConfirmation] = useState({value: '', error: ''})

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('É necessário permitir o aplicativo acessar as suas imagens!');
            }
          }
        })();
    }, []);

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    function handleChangeName(name: string){
        setName({value: name, error: ''});
    }

    function handleChangeEmail(email: string){
        if (Validator.isEmail(email)){
            setEmail({value: email, error: ''});
        }else{
            setEmail({value: email, error: 'Digite um e-mail válido!'});
        }
    }

    function handleChangePassword(password: string){
        if(Validator.validPassword(password)){
            setPassword({value: password, error: ''});

        }else{
            setPassword({value: password, error: 'A sua senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial'});
        }
    }

    function handleChangePasswordConfirmation(passwordConfirmation: string){
        if (passwordConfirmation == password.value){
            setPasswordConfirmation({value: passwordConfirmation, error: ''})
        }else{
            setPasswordConfirmation({value: passwordConfirmation, error: 'As senhas devem ser iguais!'})
        }
        
    }

    async function imageToBase64(){
        if (image){
            const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
            return base64;
        }else{
            return '  '
        }
    }

    async function onSignUpPressed(){
        
        const base64 = await imageToBase64();

        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value,
            imageData: base64,
        };

        try{
            const signupConfirm = await signup(body);

            signupConfirm ?
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                })
                :
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Register" }],
                    })

        }catch(err){
            navigation.reset({
                index: 0,
                routes: [{ name: "Register" }],
              });
        }


    }
    return (
        <Background>
            <Logo />
            <Header> Cadastre-se e ganhe recompensas pelo seu lixo!</Header>
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
                    Foto de Perfil
                </Text>
            </View>
            <TextField
                placeholder="Nome"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangeName(text)}
                error={!!name.error}
                errorText={name.error}
            />
            
            <TextField 
                placeholder="Email"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangeEmail(text)}
                error={!!email.error}
                errorText={email.error}
            />
            <TextField
                placeholder="Senha"
                returnKeyType="next"
                onChangeText={(text: string) => handleChangePassword(text)}
                secureTextEntry
                error={!!password.error}
                errorText={password.error}
            />

            <TextField
                placeholder="Confirme sua senha"
                returnKeyType="done"
                onChangeText={(text: string) => handleChangePasswordConfirmation(text)}
                secureTextEntry
                error={!!passwordConfirmation.error}
                errorText={passwordConfirmation.error}
            />
            
            <Button 
                mode="contained"
                onPress={onSignUpPressed}
                style={{marginTop: 24}}
            >
                Enviar
            </Button>

            <View style={styles.login}>
                <Text>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>Faça Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginTop: 4,
      fontFamily: fonts.text
    },
    link: {
      fontWeight: 'bold',
      color: colors.green_text,
      marginLeft: 2,
      fontFamily: fonts.text,
    },
    login: {
        flexDirection: 'row',
        fontFamily: fonts.text,
    },
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