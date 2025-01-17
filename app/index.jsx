import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useContext } from "react";
import { router } from "expo-router";
import ShoplistContext from "../context/ShoplistProvider";
import Shoplist from "../components/Shoplist";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import "../styles.css";

const HomeScreen = () => {
  const [shoplists, setShoplists] = useState([]);
  const { reload, setReload } = useContext(ShoplistContext);

  useEffect(() => {
    const getAllShoplists = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.8:3001/api/shoplists`
        );
        const data = response.data;
        console.log(data);
        if (response.status === 200) {
          setShoplists(data);
        }
      } catch (error) {
        if (error.status === 404) {
          setShoplists([]);
        }
      }
    };
    getAllShoplists();
  }, [reload]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeWrapper}>
        <View style={styles.homeContainer}>
          {shoplists.length > 0 &&
            shoplists.map((shoplist, index) => (
              <Shoplist
                name={shoplist.name}
                key={index}
                shoplistId={shoplist._id}
                reload={reload}
                setReload={setReload}
              />
            ))}
          <Text style={styles.textStyle}>Add a new shoplist</Text>
          <TouchableOpacity>
            <AntDesign
              name="plussquare"
              size={35}
              color="#93B1A6"
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
    backgroundColor: "#183D3D",
    elevation: 24,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#040D12",
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
    fontFamily: "Outfit-Regular",
  },
});

export default HomeScreen;
