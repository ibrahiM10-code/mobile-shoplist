import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import ProductDetails from "../../components/ProductDetails";
import ProductInputs from "../../components/ProductInputs";
import ShoplistContext from "../../context/ShoplistProvider";
import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import axios from "axios";

const DisplayShoplist = () => {
  const { shoplistName } = useLocalSearchParams();
  const { reload, setReload } = useContext(ShoplistContext);
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const [shoplistContent, setShoplistContent] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    index: 0,
  });

  useEffect(() => {
    const getShoplistContent = async () => {
      console.log(shoplistName);
      try {
        const response = await axios.get(
          `http://192.168.0.8:3001/api/shoplist/${shoplistName}`
        );
        if (response.status === 200) {
          setShoplistContent(response.data);
          console.log("Shoplist loaded!");
        }
      } catch (error) {
        if (error.status === 404) {
          console.error(
            "There has been an error when loading this shoplist.",
            error
          );
        }
      }
    };
    getShoplistContent();
  }, [reload]);

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
    const total = updateSubTotal();
    const updateContent = {
      quantity: shoplistContent[0].quantity,
      price: shoplistContent[0].price,
      subTotal: total,
    };
    return updateContent;
  };

  const updateProduct = async () => {
    const updateContent = prepUpdate();
    console.log(updateContent);
    try {
      const response = await axios.put(
        `http://192.168.0.8:3001/api/update-shoplist/${shoplistContent[0]._id}`,
        updateContent
      );
      if (response.status === 200) {
        console.log("Update succesful.");
        setShoplistContent((prev) => ({
          ...prev,
          subTotal: updateContent.subTotal,
        }));
        setReload(!reload);
        console.log(shoplistContent);
        console.log(response.data);
      }
    } catch (error) {
      if (error.status === 404) {
        console.log("Error while updating.");
      }
    }
  };

  const removeProduct = async (index) => {
    try {
      const response = await axios.put(
        `http://192.168.0.8:3001/api/shoplist/${shoplistName}/${index}`
      );
      if (response.status === 200) {
        console.log("Product removed succesfully!");
        console.log(response.data);
        setReload(!reload);
        setShoplistContent(() => ({
          products: shoplistContent[0].products.splice(index, 1),
          quantity: shoplistContent[0].quantity.splice(index, 1),
          price: shoplistContent[0].price.splice(index, 1),
        }));
        shoplistContent[0].subTotal = updateSubTotal();
        console.log(shoplistContent);
      }
    } catch (error) {
      if (error.status === 400) {
        console.log("There has been an error. ", error);
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
        <Text style={styles.shoplistNameStyle}>{shoplistName}</Text>
        <View style={styles.displayContainer}>
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
            keyExtractor={(item) => item._id}
            ListFooterComponent={
              <TouchableOpacity style={styles.addMoreBtn} onPress={showForm}>
                <AntDesign name="plussquare" size={35} color="#93B1A6" />
              </TouchableOpacity>
            }
          />
          {isShown && (
            <ProductInputs
              showAsModal={isShown}
              setModal={setIsShown}
              title={title}
              data={productData}
              btnAction={updateProduct}
              fn={handleProductInfo}
            />
          )}
        </View>
        {shoplistContent.length > 0 ? (
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
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "Outfit-Bold",
  },
});

export default DisplayShoplist;
