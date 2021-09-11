import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
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
        <Image source={{ uri: base64Image }} style={styles.productImage} />
        <View style={styles.infoView}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>Material: {material}</Text>
          <View
            style={{flexDirection: 'row', alignItems:'flex-end', flex: 1}}
          >
            <Text style={styles.pointsText}>{points}xp</Text>
            {
              quantity ? (
                <Text style={styles.pointsText}>{quantity} Descartes</Text>
              ):undefined
            }
          </View>
        </View>
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
    justifyContent: "flex-start",
    backgroundColor: colors.background_gray_light,
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
    width: "85%",
    minHeight: 150,
  },
  infoView: {
    flex: 1,
    alignItems: 'flex-start'
  },
  productImage: {
    width: '35%',
    resizeMode: "contain",
  },
  descriptionText: {
    fontFamily: fonts.text,
    color: colors.green_text,
    fontSize: 12,
  },

  titleText: {
    color: colors.green_text,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
    fontFamily: fonts.title,
  },

  pointsText: {
    color: colors.green_text,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    justifyContent: 'space-around',
    flex: 1,
  },
});
