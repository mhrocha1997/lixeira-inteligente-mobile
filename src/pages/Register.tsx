import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import Logo from '../components/Logo';
import Background from '../components/Background';
import Header from '../components/header';
import TextField from '../components/TextField';
import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {signup} from '../services/UserService';

export default function Register({navigation} : any){
    const [fieldErrors, setFieldErrors] = useState({
        'name': '',
        'email': '',
        'password': '',
        'passwordConfirmation': '',
    })

    const fieldsValidationSchema = yup.object().shape({
        name: yup
        .string()
        .required('O nome não pode ser vazio'),
        email: yup
        .string()
        .required('O email não pode ser vazio')
        .email('Digite um email válido'),
        password: yup
        .string()
        .required('A senha não pode ser vazia')
        .min(6, 'A senha deve conter pelo menos 6 dígitos'),
        passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Confirme a sua senha corretamente!')
      })

    const {register, setValue, handleSubmit, formState: {errors}, clearErrors} = useForm(
        {resolver: yupResolver(fieldsValidationSchema)});

    useEffect(()=>{
        register('name');
        register('email');
        register('password');
        register('passwordConfirmation');
    },[register])

    useEffect(()=>{
        let auxErrors = fieldErrors;
        Object.keys(errors).forEach((error)=>{
           auxErrors[error] = errors[error].message;
        })
        setFieldErrors(auxErrors);
    },[errors])

    async function onSignUpPressed(data: any){
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
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
                onChangeText={(text: string) => setValue('name', text)}
                error={fieldErrors.name}
            />
            
            <TextField 
                placeholder="Email"
                returnKeyType="next"
                onChangeText={(text: string) => setValue('email', text)}
                error={fieldErrors.email}
            />
            <TextField
                placeholder="Senha"
                returnKeyType="next"
                onChangeText={(text: string) => setValue('password', text)}
                secureTextEntry
                error={fieldErrors.password}
            />

            <TextField
                placeholder="Confirme sua senha"
                returnKeyType="done"
                onChangeText={(text: string) => setValue('passwordConfirmation', text)}
                secureTextEntry
                error={fieldErrors.passwordConfirmation}
            />
            
            <Button 
                mode="contained"
                onPress={handleSubmit(onSignUpPressed)}
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