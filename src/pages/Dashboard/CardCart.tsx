import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/Cart";
import { theme } from "../../style/theme";

interface Product {
  id: number;
  name: string;
  category: string;
  img: string;
  price: number;
  quantity: number;
  userId: number;
}

interface CardCartProps {
  product: Product;
}

export const CardCart = ({ product }: CardCartProps) => {
  const { name, img, quantity } = product;

  const { sumQuantity, removeQuantity, deleteFromCart } = useCart();
  const { accessToken } = useAuth();

  return (
    <Box display="flex" h="80px" w="100%" alignItems="center">
      <Box
        borderRadius="5px"
        bg="gray.100"
        w="82px"
        h="inherit"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={img} alt={name} w="40px" />
      </Box>
      <Flex flexDir="column" ml="2" h="98%" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          {name}
        </Heading>

        <Box
          display="flex"
          justifyContent="space-between"
          borderWidth="1px"
          justifySelf="flex-start"
          borderColor="gray.6"
          w="100px"
        >
          <Center
            as="button"
            onClick={() => removeQuantity(product, accessToken)}
            w="25px"
            borderRadius="2px"
            bg="gray.100"
            color="red.500"
            fontWeight="bold"
          >
            -
          </Center>
          <Heading as="span" alignSelf="center" fontWeight="500" fontSize="xs">
            {quantity}
          </Heading>
          <Center
            as="button"
            onClick={() => sumQuantity(product, accessToken)}
            bg="gray.100"
            w="25px"
            fontWeight="bold"
            color="red.500"
          >
            +
          </Center>
        </Box>
      </Flex>

      <Center
        as="button"
        onClick={() => deleteFromCart(product, accessToken)}
        alignSelf="flex-start"
        justifyContent="flex-end"
        flex="1"
      >
        <FaTrash color={theme.colors.gray[10]} />
      </Center>
    </Box>
  );
};
