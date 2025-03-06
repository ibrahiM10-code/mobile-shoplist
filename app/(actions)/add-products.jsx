import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { apiUrl } from "../../helpers/apiUrl";
import { showToast } from "../../helpers/popToast";
import { Buttons, Typography, Colors, Container } from "../../styles/index";
import CustomBackHandler from "../../components/BackHandler";
import ProductInputs from "../../components/ProductInputs";
import ShoplistContext from "../../context/ShoplistProvider";
import axios from "axios";

const AddProducts = () => {
  const { shoplistName } = useContext(ShoplistContext);
  const [productDetails, setProductDetails] = useState({
    name: [],
    quantity: [],
    price: [],
  });
  const nameInput = useRef(null);
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const setDetails = () => {
    console.log(productData);
    setProductDetails((prev) => ({
      ...prev,
      name: [...prev.name, productData.name],
      quantity: [...prev.quantity, parseInt(productData.quantity)],
      price: [...prev.price, parseInt(productData.price)],
    }));
    clearInputs();
    console.log(productDetails);
    showToast("Product added!");
  };

  const handleProductInfo = (name, value) => {
    setProductData((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  const setShoppingListTotal = () => {
    let totalsArray = [];
    for (let index = 0; index < productDetails.price.length; index++) {
      totalsArray.push(
        productDetails.price[index] * productDetails.quantity[index]
      );
    }
    const total = totalsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return total;
  };

  const clearInputs = () => {
    setProductData({ name: "", quantity: "", price: "" });
    nameInput.current?.focus();
    console.log(productDetails);
  };

  const dataPayload = () => {
    const total = setShoppingListTotal();
    const shoplistData = {
      name: shoplistName,
      products: productDetails.name,
      quantity: productDetails.quantity,
      price: productDetails.price,
      subTotal: total,
    };
    return shoplistData;
  };

  const addNewShoplist = async () => {
    try {
      const data = dataPayload();
      const response = await axios.post(`${apiUrl}/add-shoplist`, data);
      if (response.status === 201) {
        router.push("/productsList/" + shoplistName);
      }
    } catch (error) {
      if (error.status === 400) {
        console.error("Failed to create the shopping list.", error);
      }
    }
  };

  return (
    <SafeAreaView style={Container.container}>
      <View style={styles.addProductsWrapper}>
        <CustomBackHandler route={"add-shoplist"} />
        <View style={styles.addProductsContainer}>
          <Text style={styles.textStyle}>Add products to {shoplistName}</Text>
          <ProductInputs
            data={productData}
            fn={handleProductInfo}
            refValue={nameInput}
          />
          <View style={styles.addProductsBtnContainer}>
            <TouchableOpacity
              style={styles.addProductsBtn}
              onPress={setDetails}
            >
              <Text style={styles.btnText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addProductsBtn}
              onPress={addNewShoplist}
            >
              <Text style={styles.btnText}>Finish Shopping list</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addProductsContainer: {
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    ...Typography.bigTitle,
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
    ...Buttons.buttonStyle,
    width: "45%",
  },
  btnText: {
    ...Typography.buttonText,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default AddProducts;
