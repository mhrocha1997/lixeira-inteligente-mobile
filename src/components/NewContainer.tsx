import React, { useContext, useState } from "react";
import {
	Alert,
	StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    View,
    // Button
} from "react-native";

import Header from "../components/header";
import TextField from "../components/TextField";
import Button from "./Button";

import colors from "../styles/colors";
import UserContext from "../contexts/UserContext";
import { createContainer } from "../services/ContainerService";
import fonts from "../styles/fonts";


export default function NewContainer({ callbackFunction }: any) {
	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [type, setType] = useState("");
	const [totalCapacity, settotalCapacity] = useState(0);
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [district,setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');


	const { token } = useContext(UserContext);

	function handleChangeName(name: string) {
		setName(name);
		let code = name
			.toLowerCase()
			.replace(/[^\w ]+/g, "")
			.replace(/ +/g, "-")
        setCode(code);
	}

	function handleChangeType(type: string) {
		setType(type);
	}

	function handleChangeTotalCapacity(totalCapacity: number) {
		settotalCapacity(totalCapacity);
	}

    function handleChangeCep(cep: string){
        setCep(cep);
    }

    function handleChangeDistrict(district: string){
        setDistrict(district);
    }

    function handleChangeStreet(street: string){
        setStreet(street);
    }

    function handleChangeCity(city: string){
        setCity(city);
    }

    function handleChangeState(state:string){
        setState(state);
    }

	async function registerContainer() {
        const body = {
            name,
            code,
            location: {
                cep,
                street,
                district,
                city,
                state
            },
            type,
            totalCapacity,
            usedCapacity: 0,
        }

        const response = await createContainer(token, body);

        if(response){
            Alert.alert("Lixeira cadastrada com sucesso!")
            callbackFunction();
        } else{
            Alert.alert("Falha no cadastro, tente novamente")
        }

    }

	return (
        <ScrollView >
            <View style={styles.container}>
                
                <Header> Nova Lixeira</Header>
                <KeyboardAvoidingView>
                    <TextField
                        placeholder="Nome"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeName(text)}
                    />
                    <TextField
                        placeholder="Código da Lixeira"
                        returnKeyType="next"
                        editable={false}
                        value={code}
                    />
                    <TextField
                        placeholder="Material"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeType(text)}
                    />
                    <TextField
                        placeholder="Capacidade Total"
                        returnKeyType="next"
                        onChangeText={(text: number) => handleChangeTotalCapacity(text)}
                    />

                    <TextField
                        placeholder="CEP"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeCep(text)}
                    />
                    <TextField
                        placeholder="Logradouro"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeStreet(text)}
                    />

                    <TextField
                        placeholder="Bairro"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeDistrict(text)}
                    />

                    <TextField
                        placeholder="Cidade"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeCity(text)}
                    />

                    <TextField
                        placeholder="Estado"
                        returnKeyType="next"
                        onChangeText={(text: string) => handleChangeState(text)}
                    />
                </KeyboardAvoidingView>

                <Button
                    // color={colors.green_light}
                    mode='contained'
                    style={styles.button}
                    onPress={registerContainer}
                >
                    Cadastrar
                </Button>
            </View>
        </ScrollView>
			
	);
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
    },
    button: {
		fontFamily: fonts.title,
	},
})