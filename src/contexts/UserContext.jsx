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
                        console.log("É verdade")
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

    const actions = {
        login(state,action){
            console.log("state: ",state);
            setToken(action.payload);
            setIsSigned(true);
            return {
                ...state,
                token,
                isSigned
            }
        }
    }

    const initialState = {
        token,
        isSigned
    }


    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action){
        const fn = actions[action.type]
        return fn ?  fn(state,action) : state;
    }


    

    return(
        <UserContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
