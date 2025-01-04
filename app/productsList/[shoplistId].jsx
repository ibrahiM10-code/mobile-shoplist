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
import React, { useState } from "react";

const DisplayShoplist = () => {
  const { shoplistId } = useLocalSearchParams();
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("");
  const data = [
    { id: 1, productName: "Cereal", productQuantity: 2, productPrice: 7000 },
    { id: 2, productName: "Milk", productQuantity: 2, productPrice: 2100 },
    { id: 3, productName: "Takis", productQuantity: 1, productPrice: 1200 },
    { id: 4, productName: "Cheese", productQuantity: 1, productPrice: 2500 },
  ];

  const showForm = () => {
    setIsShown(!isShown);
    setTitle("Add new product");
  };
  return (
    <SafeAreaView style={isShown ? styles.containerOpacity : styles.container}>
      <View style={styles.displayWrapper}>
        <Text style={styles.shoplistNameStyle}>Shoplist Name</Text>
        <View style={styles.displayContainer}>
          <FlatList
            style={styles.flatList}
            data={data}
            renderItem={({ item }) => (
              <ProductDetails
                productName={item.productName}
                productPrice={item.productPrice}
                productQuantity={item.productQuantity}
                showAsModal={isShown}
                setModal={setIsShown}
                setTitle={setTitle}
              />
            )}
            keyExtractor={(item) => item.id}
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
            />
          )}
        </View>
        <Text style={styles.shoplistNameStyle}>Total: $12.800</Text>
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
    height: "60%",
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
