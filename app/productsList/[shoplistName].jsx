import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import ProductDetails from "../../components/ProductDetails";
import ProductInputs from "../../components/ProductInputs";
import React, { useState, useEffect } from "react";
import CustomBackHandler from "../../components/BackHandler";
import { Colors, Typography, Container } from "../../styles/index";
import { uid } from "uid";
import axios from "axios";
import { showToast } from "../../helpers/popToast";
import { apiUrl } from "../../helpers/apiUrl";
import { handleSubtotal, prepNewProduct } from "../../helpers/functions";

const DisplayShoplist = () => {
  const { shoplistName } = useLocalSearchParams();
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [shoplistContent, setShoplistContent] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    index: 0,
  });

  useEffect(() => {
    const getShoplistContent = async () => {
      try {
        const response = await axios.get(`${apiUrl}/shoplist/${shoplistName}`);
        if (response.status === 200) {
          setShoplistContent(response.data);
        }
      } catch (error) {
        if (error.status === 404) {
          console.error(
            "There has been an error when loading this shoplist.",
            error
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getShoplistContent();
  }, []);

  const handleProductInfo = (name, value) => {
    setProductData((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  const prepUpdate = () => {
    shoplistContent[0].quantity[productData.index] = parseInt(
      productData.quantity
    );
    shoplistContent[0].price[productData.index] = parseInt(productData.price);
    shoplistContent[0].products[productData.index] = productData.name;
    const total = handleSubtotal(shoplistContent[0]);
    const updateContent = {
      products: shoplistContent[0].products,
      quantity: shoplistContent[0].quantity,
      price: shoplistContent[0].price,
      subTotal: total,
    };
    return updateContent;
  };

  // Use a state that will help choosing the right update choice.
  const addNewProduct = async () => {
    const newProductContent = prepNewProduct(shoplistContent, productData);
    try {
      const response = await axios.put(
        `${apiUrl}/update-shoplist/${shoplistContent[0]._id}`,
        newProductContent
      );
      if (response.status === 200) {
        setShoplistContent((prev) => {
          const newContent = [...prev];
          newContent[0].subTotal = newProductContent.subTotal;
          return newContent;
        });
        showToast("Added new product!");
      }
    } catch (error) {
      if (error.status === 404) {
        console.error("Error while updating.");
      }
    }
  };

  const updateProduct = async () => {
    const updateContent = prepUpdate();
    try {
      setLoading(true);
      const response = await axios.put(
        `${apiUrl}/update-shoplist/${shoplistContent[0]._id}`,
        updateContent
      );
      if (response.status === 200) {
        setShoplistContent((prev) => {
          const updatedContent = [...prev];
          updatedContent[0].subTotal = updateContent.subTotal;
          return updatedContent;
        });
        showToast("Product updated!");
      }
    } catch (error) {
      if (error.status === 404) {
        console.error("Error while updating.");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (index) => {
    try {
      setShoplistContent((prev) => {
        const removeProducts = [...prev];
        removeProducts[0].products.splice(index, 1);
        removeProducts[0].quantity.splice(index, 1);
        removeProducts[0].price.splice(index, 1);
        removeProducts[0].subTotal = handleSubtotal(shoplistContent[0]);

        return removeProducts;
      });
      const response = await axios.put(
        `${apiUrl}/shoplist/${shoplistName}/${index}`,
        { subTotal: shoplistContent[0].subTotal }
      );
      if (response.status === 200) {
        showToast("Product removed!");
      }
    } catch (error) {
      if (error.status === 400) {
        console.error("There has been an error. ", error);
      }
    }
  };

  const showForm = () => {
    setIsShown(!isShown);
    setTitle("Add new product");
  };
  return (
    <SafeAreaView
      style={isShown ? styles.containerOpacity : Container.container}
    >
      <View style={styles.displayWrapper}>
        <CustomBackHandler route={"index"} />
        {loading ? (
          <Text style={styles.shoplistNameStyle}>Loading {shoplistName}</Text>
        ) : (
          <Text style={styles.shoplistNameStyle}>{shoplistName}</Text>
        )}
        <View
          style={
            isShown ? styles.displayContainerHidden : styles.displayContainer
          }
        >
          <FlatList
            style={styles.flatList}
            data={shoplistContent}
            renderItem={({ item }) => (
              <ProductDetails
                details={item}
                showAsModal={isShown}
                setModal={setIsShown}
                setTitle={setTitle}
                setProductData={setProductData}
                productData={productData}
                shoplistName={shoplistName}
                removeProduct={removeProduct}
                key={uid()}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            extraData={shoplistContent}
            overScrollMode="never"
            ListFooterComponent={
              loading ? (
                <ActivityIndicator
                  style={styles.addMoreBtn}
                  size={"large"}
                  color={Colors.textAccent}
                />
              ) : (
                <TouchableOpacity style={styles.addMoreBtn} onPress={showForm}>
                  <AntDesign
                    name="plussquare"
                    size={35}
                    color={Colors.buttonColor}
                  />
                </TouchableOpacity>
              )
            }
          />

          {isShown && (
            <ProductInputs
              showAsModal={isShown}
              setModal={setIsShown}
              title={title}
              data={productData}
              updateFn={updateProduct}
              addProductFn={addNewProduct}
              fn={handleProductInfo}
            />
          )}
        </View>
        {loading ? (
          <Text style={styles.shoplistNameStyle}>Loading Total</Text>
        ) : shoplistContent.length > 0 ? (
          <Text style={styles.shoplistNameStyle}>
            Total: ${shoplistContent[0].subTotal}
          </Text>
        ) : (
          <Text style={styles.shoplistNameStyle}>Total: $0</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerOpacity: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  displayWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayContainer: {
    backgroundColor: Colors.mainColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: "50%",
    position: "relative",
    width: "88%",
  },
  displayContainerHidden: {
    backgroundColor: "#040D12",
    borderRadius: 10,
    height: "50%",
    position: "relative",
    width: "80%",
  },
  addMoreBtn: {
    marginTop: 10,
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  shoplistNameStyle: {
    ...Typography.bigTitle,
    marginBottom: 20,
    marginTop: 20,
  },
  loading: {
    flexDirection: "row",
    alignSelf: "center",
  },
  flatList: {
    bottom: 20,
  },
});

export default DisplayShoplist;
