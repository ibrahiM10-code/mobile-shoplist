import { View, Text, TextInput, StyleSheet } from "react-native";
import { Typography } from "../styles/index";
import React, { forwardRef } from "react";

const FormInput = forwardRef(({ inputTitle, value, setValue }, ref) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitleStyle}>{inputTitle}</Text>
      <TextInput
        style={styles.inputTypeStyle}
        inputMode={
          inputTitle === "Price" ||
          inputTitle === "Quantity" ||
          inputTitle === "New Price" ||
          inputTitle === "New Quantity"
            ? "numeric"
            : "text"
        }
        value={value}
        onChangeText={setValue}
        ref={ref}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
  },
  inputTitleStyle: {
    ...Typography.inputText,
    marginBottom: 10,
  },
  inputTypeStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    color: "white",
    fontFamily: "Outfit-Regular",
    padding: 10,
    width: "100%",
    marginBottom: 15,
    marginTop: 4,
  },
});

export default FormInput;
