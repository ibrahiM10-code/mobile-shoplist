import { Stack, View } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(actions)" options={{ headerShown: false }} />
      <Stack.Screen
        name="productsList/[shoplistId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
