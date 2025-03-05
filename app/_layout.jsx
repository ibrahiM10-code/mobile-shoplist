import * as SplashScreen from "expo-splash-screen";
import { Stack, View } from "expo-router";
import { useFonts } from "expo-font";
import { ShoplistProvider } from "../context/ShoplistProvider";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../styles/index.js";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ShoplistProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(actions)" options={{ headerShown: false }} />
        <Stack.Screen
          name="productsList/[shoplistName]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar backgroundColor={Colors.background} />
    </ShoplistProvider>
  );
};

export default RootLayout;
