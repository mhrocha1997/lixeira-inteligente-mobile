import React, {createContext, useEffect, useState} from 'react';

const UserContext = createContext({})

export const UserProvider = ({children}) =>{
    const [token, setToken] = useState();
    const [isSigned, setIsSigned] = useState();

    function handleLogin(token){
        setToken(token);
        setIsSigned(true);
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
            value={
                token,
                isSigned,
                handleLogin
            }
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
