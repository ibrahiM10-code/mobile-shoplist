import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const FormInput = ({ inputTitle, value, setValue }) => {
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
        value={value}
        onChangeText={setValue}
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
    fontFamily: "Outfit-Medium",
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
