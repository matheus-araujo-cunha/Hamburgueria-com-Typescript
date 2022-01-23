import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/Cart";

interface CardProductsProps {
  product: Product;
}

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  img: string;
}

export const CardProducts = ({ product }: CardProductsProps) => {
  const { img, name, price, id } = product;

  const { addToCart } = useCart();
  const { user, accessToken } = useAuth();

  const handleAddToCart = () => {
    addToCart(product, accessToken, user.id);
  };

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      minW="280px"
      w="280px"
      h="320px"
      borderRadius="5px"
      mb={["3", "3", "0", "0"]}
      border="2px"
      bg="white"
      borderColor="gray.100"
      _hover={{ borderColor: "green.500", transform: "translateY(-7px)" }}
      transition="border 0.2s, transform 0.2s"
    >
      <Center w="99.9%" bg="gray.0">
        <Image w="150px" h="140px" src={img} alt={name} />
      </Center>

      <VStack spacing={5} alignItems="flex-start" ml={4} mt={5}>
        <Heading as="h2" fontSize="sm" color="gray.600">
          {name}
        </Heading>

        <Heading as="h3" color="gray.300" fontWeight="400" fontSize="sm">
          {product.category}
        </Heading>

        <Heading as="span" color="green.500" fontSize="sm">
          R${" "}
          {price.toString().length > 2
            ? price.toFixed(2).toString().replace(".", ",")
            : price.toFixed(2).replace(".", ",")}
        </Heading>

        <Button
          onClick={handleAddToCart}
          bg="gray.10"
          color="white"
          _hover={{ bg: "green.500" }}
        >
          Adicionar
        </Button>
      </VStack>
    </Flex>
  );
};
