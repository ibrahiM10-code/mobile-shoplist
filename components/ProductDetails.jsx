import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import ShoplistContext from "../context/ShoplistProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const ProductDetails = ({
  details,
  showAsModal,
  setModal,
  setTitle,
  setProductData,
  removeProduct,
}) => {
  const showForm = (name, quantity, price, index) => {
    setModal(!showAsModal);
    setTitle("Update product");
    setProductData({ name, quantity, price, index });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {details.products.map((product, index) => (
          <View style={styles.productDetailsContainer} key={index}>
            <View style={styles.details}>
              <Text style={styles.productNameText}>{product}</Text>
              <Text style={styles.productQuantityText}>
                Quantity: {details.quantity[index]}
              </Text>
            </View>
            <Text style={styles.productPrice}>${details.price[index]}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={() =>
                  showForm(
                    details.products[index],
                    details.quantity[index],
                    details.price[index],
                    index
                  )
                }
              >
                <MaterialIcons name="edit-square" size={28} color="#5C8374" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeProduct(index)}>
                <Ionicons name="trash" size={28} color="#5C8374" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    borderTopColor: "white",
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderBottomColor: "white",
    borderStyle: "solid",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 3,
  },
  productNameText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Outfit-Regular",
    // maxWidth: 60,
    width: 70,
  },
  productQuantityText: {
    color: "white",
    fontSize: 11,
    marginTop: 3,
    fontFamily: "Outfit-Regular",
  },
  productPrice: {
    color: "white",
    fontSize: 20,
    fontFamily: "Outfit-Medium",
    // maxWidth: 0,
  },
  actionsContainer: {
    padding: 10,
  },
});

export default ProductDetails;
