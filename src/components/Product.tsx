import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { ProductProps } from "../types/ProductProps";
import CardView from "./CardView";

export default function Product({
  imageData,
  type,
  name,
  points,
  discards,
}: ProductProps) {
  let base64Image = `data:image/png;base64,${imageData}`;
  return (
    <CardView>
      <Image source={{ uri: base64Image }} style={styles.productImage} />
        <View style={styles.infoView}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>Material: {type}</Text>
          <View
            style={{flexDirection: 'row', alignItems:'flex-end', flex: 1}}
          >
            <Text style={styles.pointsText}>{points}xp</Text>
            {
              discards ? (
                <Text style={styles.pointsText}>{discards} Descartes</Text>
              ):undefined
            }
          </View>
        </View>
    </CardView>
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
    marginRight: 10,
  },
  descriptionText: {
    fontFamily: fonts.text,
    color: colors.green_text,
    fontSize: 16,
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
