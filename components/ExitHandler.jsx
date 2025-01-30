import { useEffect } from "react";
import { BackHandler } from "react-native";

const ExitHandler = () => {
  useEffect(() => {
    const backAction = () => {
      // Close the app when back is pressed
      BackHandler.exitApp();
      return true; // Prevent default behavior (going back)
    };

    // Add event listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup the event listener on unmount
  }, []);
};

export default ExitHandler;
