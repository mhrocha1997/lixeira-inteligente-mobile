import React, {createContext, useContext, useEffect, useState} from 'react';
import { getInventory } from '../services/InventoryService';
import { Inventoryprops, ProductProps } from '../types/ProductProps';
import UserContext from './UserContext';

type ProductsContext = {
    reloadInventory: Boolean,
    setInventory: () => void,
    discards: Inventoryprops[],
    handleDiscardSucceeded: () => void,
}

const ProductsContext = createContext({} as ProductsContext);

type Children = {
    children: React.ReactNode,
}
export const ProductsProvider = ({children}: Children) => {
    const [reloadInventory, setReload] = useState(true);
    const [ discards, setDiscards] = useState<Inventoryprops[]>([]);

    const {token, userId} = useContext(UserContext);

    async function setInventory(){
        const inventory = await getInventory(token, userId);
        setDiscards(inventory)
        setReload(false);
    }
    
    useEffect(() => {
        if(reloadInventory){
            setInventory();
        }
    },[token, userId, reloadInventory]);

    function handleDiscardSucceeded(){
        setReload(true);
    }

    return (
        <ProductsContext.Provider value={{ reloadInventory, setInventory, discards, handleDiscardSucceeded }}>
          {children}
        </ProductsContext.Provider>
      );
}

export default ProductsContext;