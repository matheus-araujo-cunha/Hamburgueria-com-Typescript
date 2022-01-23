import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/Products";
import { CardProducts } from "./CardProducts";

export const ListProducts = () => {
  const { getProducts, products, filteredProducts, setFilteredProducts } =
    useProducts();
  const { accessToken } = useAuth();

  useEffect(() => {
    getProducts(accessToken);
  }, [getProducts]);

  return (
    <Flex
      alignSelf="center"
      justifyContent={["normal", "normal", "center", "center"]}
      paddingY={2}
      alignItems={["center", "center", "auto", "auto"]}
      gap={["25px", "25px", "50px", "50px"]}
      mr={["0", "0", "10", "10"]}
      mb={["0", "0", "20", "20"]}
      flexWrap={["nowrap", "nowrap", "wrap", "wrap"]}
      w={["95%", "100%", "90%", "90%"]}
      overflow="hidden"
      overflowX={["scroll", "scroll", "visible", "visible"]}
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "gray.100",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "green.500",
          borderRadius: "20px",
          border: "3px solid",
          borderColor: "green.500",
        },
      }}
    >
      {filteredProducts.length
        ? filteredProducts.map((product) => (
            <CardProducts key={product.id} product={product} />
          ))
        : products.map((product) => (
            <CardProducts key={product.id} product={product} />
          ))}
    </Flex>
  );
};
