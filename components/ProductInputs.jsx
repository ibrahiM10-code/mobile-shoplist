import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import FormInput from "./FormInput";

const ProductInputs = ({ showAsModal, setModal, title, data, fn }) => {
  return (
    <View style={showAsModal && styles.positioning}>
      <FormInput
        inputTitle={"Product Name"}
        setValue={(value) => fn("name", value)}
      />
      <FormInput
        inputTitle={"Quantity"}
        setValue={(value) => fn("quantity", value)}
      />
      <FormInput
        inputTitle={"Price"}
        setValue={(value) => fn("price", value)}
      />
      {showAsModal && (
        <TouchableOpacity
          style={styles.addProductsBtn}
          onPress={() => setModal(!showAsModal)}
        >
          <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  positioning: {
    position: "absolute",
    backgroundColor: "#040D12",
    width: "90%",
    padding: 20,
    left: 17,
    bottom: 25,
    borderRadius: 10,
    zIndex: 1,
  },
  addProductsBtn: {
    backgroundColor: "#93B1A6",
    borderRadius: 10,
    padding: 10,
    width: "50%",
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Outfit-Medium",
  },
});

export default ProductInputs;
