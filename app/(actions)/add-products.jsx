import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ProductInputs from "../../components/ProductInputs";
import React from "react";

const AddProducts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addProductsWrapper}>
        <View style={styles.addProductsContainer}>
          <Text style={styles.textStyle}>Add products to the shoplist</Text>
          <ProductInputs />
          <View style={styles.addProductsBtnContainer}>
            <TouchableOpacity style={styles.addProductsBtn}>
              <Text style={styles.btnText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addProductsBtn}
              onPress={() => router.push("/productsList/1")}
            >
              <Text style={styles.btnText}>Finish Shoplist</Text>
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
    backgroundColor: "#000000eb",
  },
  addProductsContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    width: "85%",
  },
  addProductsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  addProductsBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  addProductsBtn: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    width: "45%",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddProducts;
