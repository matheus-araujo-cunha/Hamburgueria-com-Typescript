import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../style/theme";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./Products";
import { CartProvider } from "./Cart";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <AuthProvider>
    <ProductsProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CartProvider>
    </ProductsProvider>
  </AuthProvider>
);
