import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text } from "react-native";
import Product from "../components/Product";
import {getCatalog} from "../services/api";
import { FlatList } from "react-native-gesture-handler";
import UserContext from "../contexts/UserContext";
import { ProductProps } from "../types/ProductProps";
import { getCatalogFake } from "../services/fake_api";
import colors from "../styles/colors";

export default function Catalog() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  
  useEffect(() => {
    async function fetchProducts(){
      // let products = await getCatalog();
      let products = await getCatalogFake();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <SafeAreaView>
      <View style={{backgroundColor: colors.background_white}}>
        {products != [] ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id_item.toString()}
            renderItem={({ item }) => (
              <Product
                id_item={item.id_item}
                img_base64={item.img_base64}
                name={item.name}
                material={item.material}
                points={item.points}
                quantity={0}
              />
            )}
          />
        ) : (
          <Text> Ainda não há produtos cadastrados</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
