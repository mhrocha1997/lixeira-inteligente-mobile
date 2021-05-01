import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text } from "react-native";
import Product from "../components/Product";
import api from "../services/api";
import { FlatList } from "react-native-gesture-handler";
import UserContext from "../contexts/UserContext";
import { ProductProps } from "../types/ProductProps";

export default function Catalog() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { token } = useContext(UserContext);

  async function getProducts() {
    const response = await api.get("/get/item/full", {
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    setProducts(response.data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SafeAreaView>
      <View>
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
