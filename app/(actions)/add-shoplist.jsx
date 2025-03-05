import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Buttons, Typography, Colors, Container } from "../../styles/index";
import CustomBackHandler from "../../components/BackHandler";
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
    <SafeAreaView style={Container.container}>
      <View style={styles.addShoplistWrapper}>
        <CustomBackHandler route={"index"} />
        <View style={styles.addShoplistContainer}>
          <FormInput
            inputTitle={"Name your new shopping list"}
            value={newShoplist}
            setValue={setNewShoplist}
          />
          <TouchableOpacity
            style={styles.addShoplistBtn}
            onPress={handleOnPress}
          >
            <Text style={styles.btnText}>Add new shopping list</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addShoplistWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addShoplistContainer: {
    backgroundColor: Colors.mainColor,
    borderRadius: 10,
    padding: 20,
    width: "85%",
  },
  addShoplistBtn: {
    ...Buttons.buttonStyle,
    marginTop: 15,
    width: "50%",
  },
  btnText: {
    ...Typography.buttonText,
    textAlign: "center",
  },
});

export default AddShoplist;
