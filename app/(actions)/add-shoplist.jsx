import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormInput from "../../components/FormInput";
import ShoplistContext from "../../context/ShoplistProvider";
import React, { useState, useContext } from "react";

const AddShoplist = () => {
  const [newShoplist, setNewShoplist] = useState("");
  const { newShoplistName } = useContext(ShoplistContext);

  const handleOnPress = () => {
    newShoplistName(newShoplist);
    router.push("/add-products");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addShoplistWrapper}>
        <View style={styles.addShoplistContainer}>
          <FormInput
            inputTitle={"Name your new shoplist"}
            value={newShoplist}
            setValue={setNewShoplist}
          />
          <TouchableOpacity
            style={styles.addShoplistBtn}
            onPress={handleOnPress}
          >
            <Text style={styles.btnText}>Add new shoplist</Text>
          </TouchableOpacity>
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
  addShoplistWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addShoplistContainer: {
    backgroundColor: "#183D3D",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  addShoplistBtn: {
    backgroundColor: "#5C8374",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: "50%",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
});

export default AddShoplist;
