import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Buttons, Colors, Typography } from "../styles/index";
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
      // Update accordingly to the changes on [shoplistName].jsx
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
    backgroundColor: Colors.mainColor,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    zIndex: 1,
  },
  addProductsBtn: {
    ...Buttons.buttonStyle,
    width: "45%",
  },
  btnText: {
    ...Typography.buttonText,
    textAlign: "center",
  },
  btnsContainer: {
    marginVertical: 3,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductInputs;
