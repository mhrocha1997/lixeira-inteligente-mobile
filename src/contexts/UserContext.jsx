import React, {createContext, useEffect, useState, useReducer} from 'react';

const UserContext = createContext({})

const actions = {
    login(state,action){
        setToken(action.token);
        setIsSigned(true);
        return {
            ...state,
            token,
            isSigned
        }
    }
}

export const UserProvider = ({children}) =>{
    const [token, setToken] = useState();
    const [isSigned, setIsSigned] = useState(false);

    const initialState = {
        token,
        isSigned
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action){
        const fn = actions[action.type]
        return fn ?  fn(state,action) : state;
    }


    useEffect( () => {

        async function verifyToken(){
            try {
                console.log("lendo token...");
                const token =  AsyncStorage.getItem('token');
                if(token !== null) {
                    setToken(token);

                    const response = await api.get('/token', {'headers': {"Authorization": token}});
                    
                    if(response.status==200){
                        setIsSigned(true)
                    }else{
                        setIsSigned(false)
                    }
        
                }   
              } catch(e) {
                console.log("Erro ao ler o token");
              }
        }
        
        verifyToken();
      },[])

    return(
        <UserContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
