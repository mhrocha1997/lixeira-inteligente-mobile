import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useForm} from 'react-hook-form';

import Logo from '../components/Logo';
import Background from '../components/Background';
import Header from '../components/header';
import TextField from '../components/TextField';
import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {signup} from '../services/UserService';
import Validator from '../utils/Validator';

export default function Register({navigation} : any){
    const [ name, setName] = useState({value: '', error: ''})
    const [ email, setEmail] = useState({value: '', error: ''})
    const [ password, setPassword] = useState({value: '', error: ''})
    const [ passwordConfirmation, setPasswordConfirmation] = useState({value: '', error: ''})


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

    async function onSignUpPressed(){
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value,
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
  })