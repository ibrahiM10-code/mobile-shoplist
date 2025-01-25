import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import axios from "axios";
import React from "react";
import { apiUrl } from "../helpers/apiUrl";
import { showToast } from "../helpers/popToast";

const Shoplist = ({ name, shoplistId, setReload, reload }) => {
  const deleteShoplist = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/delete-shoplist/${shoplistId}`
      );
      if (response.status === 200) {
        console.log(`The ${name} shoplist has been deleted.`);
        showToast("Shopping list removed!");
        setReload(!reload);
      }
    } catch (error) {
      if (error.status === 400) {
        console.log(
          `There has been an error when deleting the ${name} shoplist.`
        );
      }
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.shoplistWrapper}>
        <Link href={`/productsList/${name}`} style={styles.shoplistNameStyle}>
          {name}
        </Link>
        <TouchableOpacity onPress={deleteShoplist}>
          <Ionicons name="trash" size={28} color="#5C8374" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shoplistWrapper: {
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    width: "70%",
  },
  shoplistNameStyle: {
    color: "white",
    fontFamily: "Outfit-Regular",
    fontSize: 18,
  },
});

export default Shoplist;
