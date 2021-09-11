import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Logo from "../components/Logo";
import Background from "../components/Background";
import Header from "../components/header";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

import api from "../services/api";
import UserContext from "../contexts/UserContext";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Login() {
  const { handleLogin } = useContext(UserContext);
  
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const navigation = useNavigation();


  const _storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch {
      console.error("Erro ao armazenar o token");
    }
  };

  async function onLoginPressed() {
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await api.post("/login/user", data, {
        headers: { "content-type": "application/json" },
      });

      const token = response.data.data.token;

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
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header> Bem vindo!</Header>
      <TextInput
        description
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
      <Button style={styles.button} mode="contained" onPress={onLoginPressed}>
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
