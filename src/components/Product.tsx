import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ProductProps } from "../types/ProductProps";

export default function Product({
  img_base64,
  material,
  name,
  points,
  quantity,
}: ProductProps) {
  let base64Image = `data:image/png;base64,${img_base64}`;
  return (
    <View style={styles.centeredView}>
      <View style={styles.cardView}>
        <View style={styles.infoView}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>Material: {material}</Text>
          {quantity && (
            <Text style={styles.descriptionText}>Quantidade: {quantity}</Text>
          )}
          <Text style={styles.pointsText}>{points} pontos</Text>
        </View>
        <Image source={{ uri: base64Image }} style={styles.productImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },

  cardView: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#31ce8c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    minHeight: 150,
  },
  infoView: {
    flex: 1,
  },
  productImage: {
    flex: 1,
    resizeMode: "contain",
  },

  descriptionText: {
    flex: 1,
  },

  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },

  pointsText: {
    color: "#31ce8c",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
