import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { apiUrl } from "../../helpers/apiUrl";
import { showToast } from "../../helpers/popToast";
import CustomBackHandler from "../../components/BackHandler";
import ProductInputs from "../../components/ProductInputs";
import ShoplistContext from "../../context/ShoplistProvider";
import axios from "axios";

const AddProducts = () => {
  const { shoplistName } = useContext(ShoplistContext);
  const [productDetails, setProductDetails] = useState([]);
  const nameInput = useRef(null);
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const setDetails = async () => {
    setProductDetails((prevProduct) => {
      return [...prevProduct, productData];
    });
    // console.log("Added! to ", shoplistName);
    clearInputs();
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

  const clearInputs = () => {
    setProductData({ name: "", quantity: "", price: "" });
    nameInput.current?.focus();
  };

  const dataPayload = () => {
    let quantitiesArray = [];
    let pricesArray = [];
    let productsArray = [];
    let totalsArray = [];
    productDetails.map((content) => {
      totalsArray.push(content.quantity * content.price);
      productsArray.push(content.name);
      quantitiesArray.push(parseInt(content.quantity));
      pricesArray.push(parseInt(content.price));
      return 1;
    });
    const total = totalsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    const shoplistData = {
      name: shoplistName,
      products: productsArray,
      quantity: quantitiesArray,
      price: pricesArray,
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
    <SafeAreaView style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: "#040D12",
  },
  addProductsContainer: {
    backgroundColor: "#183D3D",
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
    fontFamily: "Outfit-Bold",
  },
  addProductsBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  addProductsBtn: {
    backgroundColor: "#93B1A6",
    borderRadius: 10,
    padding: 10,
    width: "45%",
    height: "70%",
  },
  btnText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
});

export default AddProducts;
