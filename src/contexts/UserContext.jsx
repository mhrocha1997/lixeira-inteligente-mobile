import React, {createContext, useEffect, useState, useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api';

const UserContext = createContext({})

export const UserProvider = ({children}) =>{
    const [token, setToken] = useState();
    const [isSigned, setIsSigned] = useState(false);

    useEffect( () => {

        async function verifyToken(){
            try {
                console.log("lendo token...");
                const token =  await AsyncStorage.getItem('token');
                console.log("Token: ", token)
                if(token !== null) {
                    setToken(token);
                    const response = await api.get('/token', {'headers': {"Authorization": token}});
                    if(response.status==200){
                        console.log("Token é válido!")
                        setIsSigned(true)
                        console.log("isSigned: ", isSigned)
                        
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
            value={{isSigned,token}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
