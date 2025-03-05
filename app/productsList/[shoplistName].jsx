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
import { uid } from "uid";
import axios from "axios";
import { showToast } from "../../helpers/popToast";
import { apiUrl } from "../../helpers/apiUrl";

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

  const updateSubTotal = () => {
    let totals = [];
    for (let index = 0; index < shoplistContent[0].price.length; index++) {
      totals.push(
        shoplistContent[0].price[index] * shoplistContent[0].quantity[index]
      );
    }
    const total = totals.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    shoplistContent[0].subTotal = total;
    return total;
  };

  const prepUpdate = () => {
    shoplistContent[0].quantity[productData.index] = parseInt(
      productData.quantity
    );
    shoplistContent[0].price[productData.index] = parseInt(productData.price);
    shoplistContent[0].products[productData.index] = productData.name;
    const total = updateSubTotal();
    const updateContent = {
      products: shoplistContent[0].products,
      quantity: shoplistContent[0].quantity,
      price: shoplistContent[0].price,
      subTotal: total,
    };
    return updateContent;
  };

  // Use a state that will help choosing the right update choice.
  const addProduct = async () => {
    shoplistContent[0].products.push(productData.name);
    shoplistContent[0].price.push(parseInt(productData.price));
    shoplistContent[0].quantity.push(parseInt(productData.quantity));
    const newProductContent = {
      products: shoplistContent[0].products,
      quantity: shoplistContent[0].quantity,
      price: shoplistContent[0].price,
      subTotal: updateSubTotal(),
    };
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
        console.log(shoplistContent);
        showToast("Product updated!");
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
        console.log(shoplistContent);
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
        removeProducts[0].subTotal = updateSubTotal();

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
    <SafeAreaView style={isShown ? styles.containerOpacity : styles.container}>
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
                  style={styles.loading}
                  size={"large"}
                  color={"#93B1A6"}
                />
              ) : (
                <TouchableOpacity style={styles.addMoreBtn} onPress={showForm}>
                  <AntDesign name="plussquare" size={35} color="#93B1A6" />
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
              addProductFn={addProduct}
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
  container: {
    flex: 1,
    backgroundColor: "#040D12",
  },
  containerOpacity: {
    flex: 1,
    backgroundColor: "rgb(0, 0, 0)",
  },
  displayWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayContainer: {
    backgroundColor: "#183D3D",
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
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  shoplistNameStyle: {
    color: "white",
    fontSize: 20,
    marginBottom: 30,
    marginTop: 20,
    fontFamily: "Outfit-Bold",
  },
  loading: {
    //position: "relative",
    // bottom: 160,
    //justifyContent: "center",
  },
  flatList: {
    bottom: 20,
  },
});

export default DisplayShoplist;
