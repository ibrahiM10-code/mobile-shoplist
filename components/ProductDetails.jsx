import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Buttons, Colors, Typography } from "../styles/index";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

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
          <View
            style={
              index === 0
                ? {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    ...styles.productDetailsContainer,
                  }
                : styles.productDetailsContainer
            }
            key={index}
          >
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
                <MaterialIcons
                  name="edit-square"
                  size={28}
                  color={Colors.buttonColor}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeProduct(index)}>
                <Ionicons name="trash" size={28} color={Colors.buttonColor} />
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
    backgroundColor: Colors.mainColor,
    borderColor: Colors.textAccent,
    borderBottomWidth: 1,
    borderStyle: "solid",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 3,
  },
  productNameText: {
    ...Typography.productNameText,
    maxWidth: "60",
  },
  productQuantityText: {
    ...Typography.productQuantityText,
    marginTop: 3,
  },
  productPrice: {
    ...Typography.productPriceText,
  },
  actionsContainer: {
    padding: 10,
  },
});

export default ProductDetails;
