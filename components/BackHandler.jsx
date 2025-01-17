import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomBackHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      // Replace current screen with the desired screen
      navigation.replace("index"); // Replace with your target screen
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    // Cleanup on unmount
    return () => backHandler.remove();
  }, [navigation]);

  return null;
};

export default CustomBackHandler;
