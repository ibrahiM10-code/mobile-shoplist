import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

const ProductDetails = ({ productName, productQuantity, productPrice }) => {
  return (
    <View style={styles.productDetailsContainer}>
      <View style={styles.details}>
        <Text style={styles.productNameText}>{productName}</Text>
        <Text style={styles.productQuantityText}>
          Quantity: {productQuantity}
        </Text>
      </View>
      <Text style={styles.productPrice}>${productPrice}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <MaterialIcons name="edit-square" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="trash" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000eb",
  },
  productDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderStyle: "solid",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  productNameText: {
    color: "white",
    fontSize: 18,
  },
  productQuantityText: {
    color: "white",
    fontSize: 15,
  },
  productPrice: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  actionsContainer: {
    padding: 10,
  },
});

export default ProductDetails;
