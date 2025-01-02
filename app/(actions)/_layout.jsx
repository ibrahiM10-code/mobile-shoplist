import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const ActionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="add-shoplist" options={{ headerShown: false }} />
      <Stack.Screen name="add-products" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ActionsLayout;
