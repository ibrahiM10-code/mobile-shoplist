import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FormInput from "./FormInput";

const ProductInputs = ({
  showAsModal,
  setModal,
  title,
  data,
  fn,
  updateFn,
  addProductFn,
  refValue,
}) => {
  const action = () => {
    if (title === "Update product") {
      updateFn();
    } else if (title === "Add new product") {
      addProductFn();
    }
    setModal(!showAsModal);
  };
  return (
    <View style={showAsModal && styles.positioning}>
      <FormInput
        inputTitle={"Product Name"}
        value={data.name}
        setValue={(value) => fn("name", value)}
        ref={refValue}
      />
      <FormInput
        inputTitle={title === "Update product" ? "New Quantity" : "Quantity"}
        value={data.quantity.toString()}
        setValue={(value) => fn("quantity", value)}
      />
      <FormInput
        inputTitle={title === "Update product" ? "New Price" : "Price"}
        value={data.price.toString()}
        setValue={(value) => fn("price", value)}
      />
      {showAsModal && (
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.addProductsBtn} onPress={action}>
            <Text style={styles.btnText}>{title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addProductsBtn}
            onPress={() => setModal(!showAsModal)}
          >
            <Text style={styles.btnText}>Discard changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  positioning: {
    position: "relative",
    backgroundColor: "#5C8374",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    width: "95%",
    left: 7,
    bottom: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  addProductsBtn: {
    backgroundColor: "#183D3D",
    borderRadius: 10,
    padding: 10,
    width: "40%",
  },
  btnText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Outfit-Medium",
  },
  btnsContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductInputs;
