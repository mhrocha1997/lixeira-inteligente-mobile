import React, {createContext, useEffect, useState, useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api';

const UserContext = createContext({})

export const UserProvider = ({children}) =>{
    const [token, setToken] = useState();
    const [isSigned, setIsSigned] = useState(false);
    const [points, setPoints] = useState(0);


    useEffect(() => {
        async function getPoints(){
            const response =  await api.get('/get/user', {'headers': {'Authorization': token}});
            setPoints(response.data.data[0].points);
        }
        getPoints();
    },[])

    useEffect( () => {

        async function verifyToken(){
            try {
                const token =  await AsyncStorage.getItem('token');
                if(token !== null) {
                    setToken(token);
                    const response = await api.get('/token', {'headers': {"Authorization": token}});
                    console.log(response)
                    if(response.status==200){

                        setIsSigned(true)
                    }else{
                        setIsSigned(false)
                    }
                }   
              } catch(e) {
                console.log("Erro ao ler o token", e);
              }
        }
        verifyToken();
      },[])

    function handleLogin(token){
        setToken(token);
        setIsSigned(true);
        }

    const initialState = {
        token,
        isSigned
    }

    function reducer(state, action){
        const fn = actions[action.type]
        return fn ?  fn(state,action) : state;
    }


    return(
        <UserContext.Provider
            value={{isSigned,token, handleLogin}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
