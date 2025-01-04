import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FormInput from "./FormInput";

const ProductInputs = ({ showAsModal, setModal, title }) => {
  return (
    <View style={showAsModal && styles.positioning}>
      <FormInput inputTitle={"Product Name"} />
      <FormInput inputTitle={"Quantity"} />
      <FormInput inputTitle={"Price"} />
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
    backgroundColor: "black",
    width: "90%",
    padding: 20,
    left: 17,
    bottom: 25,
    borderRadius: 10,
    zIndex: 1,
  },
  addProductsBtn: {
    backgroundColor: "green",
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
