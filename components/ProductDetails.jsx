import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";

const ProductDetails = ({
  productName,
  productQuantity,
  productPrice,
  showAsModal,
  setModal,
  setTitle,
}) => {
  const showForm = () => {
    setModal(!showAsModal);
    setTitle("Update product");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
              <MaterialIcons
                name="edit-square"
                size={28}
                color="#5C8374"
                onPress={showForm}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash" size={28} color="#5C8374" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#183D3D",
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
    fontFamily: "Outfit-Regular",
  },
  productQuantityText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Outfit-Regular",
  },
  productPrice: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Outfit-Medium",
  },
  actionsContainer: {
    padding: 10,
  },
});

export default ProductDetails;
