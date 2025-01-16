import React, { useEffect, useState } from "react";
import { createContext } from "react";

const ShoplistContext = createContext();

export function ShoplistProvider({ children }) {
  const [shoplistName, setShoplistName] = useState("");
  const [reload, setReload] = useState(false);

  const newShoplistName = (newName) => {
    setShoplistName(newName);
  };

  return (
    <ShoplistContext.Provider
      value={{ newShoplistName, shoplistName, reload, setReload }}
    >
      {children}
    </ShoplistContext.Provider>
  );
}

export default ShoplistContext;
