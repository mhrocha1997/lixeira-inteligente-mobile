import React, {useState} from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import Background from '../components/Background';
import Header from '../components/header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { register } from '../services/api';


export default function Register({navigation}){
    const[nome,setName] = useState({value: '', error: ''});
    const [email,setEmail] = useState({value: '', error: ''});
    const [ password, setPassword] = useState({value: '', error: ''});


    async function onSignUpPressed(e){
        // ### TODO: Fazer validação dos campos
        
        e.preventDefault();

        const data = {
            nome: nome.value,
            email: email.value,
            password: password.value
        };

        try{
            const response = await register(data);
            response ?
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
            <TextInput
                label="Nome"
                returnKeyType="next"
                value={nome.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!nome.error}
                errorText={nome.error}
            />
            
            <TextInput 
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({value: text, error:''})}
                error={!!email.error}
                errorText={email.error}
            />
            <TextInput
                label="Senha"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
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
      marginLeft: '2px',
      fontFamily: fonts.text,
    },
    login: {
        flexDirection: 'row',
        fontFamily: fonts.text,
    }
  })