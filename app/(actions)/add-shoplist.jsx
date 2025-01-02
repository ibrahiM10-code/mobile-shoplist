import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormInput from "../../components/FormInput";
import React from "react";

const AddShoplist = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addShoplistWrapper}>
        <View style={styles.addShoplistContainer}>
          <FormInput inputTitle={"Name your new shoplist"} />
          <TouchableOpacity
            style={styles.addShoplistBtn}
            onPress={() => router.push("/add-products")}
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
    backgroundColor: "#000000eb",
  },
  addShoplistWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addShoplistContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  addShoplistBtn: {
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: "50%",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddShoplist;
