import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Shoplist = () => {
  return (
    <SafeAreaView>
      <View style={styles.shoplistWrapper}>
        <Text style={styles.shoplistNameStyle}>Shoplist #1</Text>
        <TouchableOpacity>
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
