import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Async } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import Logo from "../components/Logo";
import Background from "../components/Background";
import Header from "../components/header";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Button from '../components/Button';

import api from "../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  _storeData = async () => {
    try{
      await AsyncStorage.setItem("token", token);
      console.log("Armazenou o token")
    }catch{
      console.log("Erro ao armazenar o token");
    }
  }
  // useEffect(() => {
  //   try {
  //     console.log("lendo token...")
  //     const token =  AsyncStorage.getItem('token')
  //     if(token !== null) {
  //       console.log("Token lido");
  //       navigation.navigate('Dashboard');
  //     }
  //   } catch(e) {
  //     console.log("Erro ao ler o token");
  //   }
  // },[])

  async function onLoginPressed() {
    const data = {
      email: email.value,
      password: password.value
    };
    
    try {
      console.log("Tentando logar ..............................")
      const response = await api.post("/login/user", data, {
        "content-type": "application/json",
      });
      token = response.data.data.token;

      _storeData();
      
      navigation.navigate('Dashboard');
      
    } catch (err) {
      console.log(err);
    }
    
  }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header> Bem vindo!</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text> Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.link}> Cadastre-se </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: '#000',
    },
    link: {
      fontWeight: 'bold',
      color:'#31ce8c',
    },
  });