import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ProductInputs from "../../components/ProductInputs";
import ShoplistContext from "../../context/ShoplistProvider";
import React, { useContext, useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const { shoplistName } = useContext(ShoplistContext);
  const [productDetails, setProductDetails] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const setDetails = () => {
    setProductDetails((prevProduct) => {
      return [...prevProduct, productData];
    });
    console.log("Added! to ", shoplistName);
  };

  const handleProductInfo = (name, value) => {
    setProductData((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
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
    console.log(shoplistData);
    return shoplistData;
  };

  const addNewShoplist = async () => {
    try {
      const data = dataPayload();
      const response = await axios.post(
        "http://192.168.0.8:3001/api/add-shoplist",
        data
      );
      if (response.status === 201) {
        console.log("Shoplist created successfully!");
        router.push("/productsList/" + shoplistName);
      }
    } catch (error) {
      if (error.status === 400) {
        console.error("Failed to create the shoplist.", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addProductsWrapper}>
        <View style={styles.addProductsContainer}>
          <Text style={styles.textStyle}>Add products to {shoplistName}</Text>
          <ProductInputs data={productData} fn={handleProductInfo} />
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
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
});

export default AddProducts;
