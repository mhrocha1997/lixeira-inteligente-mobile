import React, { useState, useContext, useEffect } from "react";
import {useForm} from 'react-hook-form'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../components/Logo";
import Background from "../components/Background";
import Header from "../components/header";
import TextField from "../components/TextField";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../contexts/UserContext";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { signin as login } from "../services/UserService";

export default function signin() {
  const { handleLogin } = useContext(UserContext);
  
  
  const {register, setValue, handleSubmit} = useForm();
  
  useEffect(() => {
    register('email');
    register('password');
  },[register])

  const navigation = useNavigation();

  const _storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch {
      console.error("Erro ao armazenar o token");
    }
  };


  async function onLoginPressed(data: any) {
    const body = {
      email: data.email,
      password: data.password,
    };

    const token = await login(body);

    try {
      if (token != null) {
        _storeData(token);
        handleLogin(token);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Background>
      <Logo />
      <Header> Bem vindo!</Header>
      <TextField
        placeholder="Email"
        returnKeyType="next"
        onChangeText={(text: any) => setValue('email', text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextField
        placeholder="Senha"
        returnKeyType="done"
        onChangeText={(text: any) => setValue('password', text)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
      <Button style={styles.button} mode="contained" onPress={(handleSubmit(onLoginPressed))}>
        Login
      </Button>
      <View style={styles.row}>
        <Text> Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}> Cadastre-se </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    fontFamily: fonts.text,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    fontFamily: fonts.text,
  },
  forgot: {
    fontSize: 13,
    color: colors.green_text,
    fontFamily: fonts.title,
  },
  link: {
    fontWeight: "bold",
    color: colors.green_text,
    fontFamily: fonts.text,
  },
  button: {
    fontFamily: fonts.title,
  }
});
