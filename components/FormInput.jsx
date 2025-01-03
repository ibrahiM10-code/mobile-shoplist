import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const FormInput = ({ inputTitle }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitleStyle}>{inputTitle}</Text>
      <TextInput
        style={styles.inputTypeStyle}
        inputMode={
          inputTitle === "Price" || inputTitle === "Quantity"
            ? "numeric"
            : "text"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
  },
  inputTitleStyle: {
    fontSize: 17,
    color: "white",
    marginBottom: 10,
  },
  inputTypeStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    color: "white",
    padding: 10,
    width: "100%",
    marginBottom: 15,
    marginTop: 4,
  },
});

export default FormInput;
