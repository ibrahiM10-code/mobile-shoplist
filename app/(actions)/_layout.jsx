import { Stack } from "expo-router";
import React from "react";
import { ShoplistProvider } from "../../context/ShoplistProvider";

const ActionsLayout = () => {
  return (
    <ShoplistProvider>
      <Stack>
        <Stack.Screen name="add-shoplist" options={{ headerShown: false }} />
        <Stack.Screen name="add-products" options={{ headerShown: false }} />
      </Stack>
    </ShoplistProvider>
  );
};

export default ActionsLayout;
