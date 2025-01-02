import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Shoplist from "../components/Shoplist";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import "../styles.css";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeWrapper}>
        <View style={styles.homeContainer}>
          <Shoplist />
          <Text style={styles.textStyle}>Add a new shoplist</Text>
          <TouchableOpacity>
            <AntDesign
              name="plussquare"
              size={35}
              color="green"
              onPress={() => router.push("/add-shoplist")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000eb",
  },
  homeWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 25,
    marginBottom: 10,
  },
});

export default HomeScreen;
