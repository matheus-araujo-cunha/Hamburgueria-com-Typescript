import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import { MdClose } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/Cart";

import { theme } from "../../style/theme";
import { CardCart } from "./CardCart";

interface ModalCartProps {
  onClose: () => void;
  isOpen: boolean;
}

export const ModalCart = ({ onClose, isOpen }: ModalCartProps) => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const { cart, deleteFromCart } = useCart();
  const { accessToken } = useAuth();

  const total = cart.reduce((acc, item) => {
    return acc + item.quantity * Number(item.price);
  }, 0);

  const handleDelete = () => {
    cart.map((product) => deleteFromCart(product, accessToken));
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={"inside"}
      size={isWideVersion ? "lg" : "xs"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          paddingX={4}
          bg="green.500"
          color="white"
          display="flex"
          justifyContent="space-between"
        >
          <Heading fontWeight="bold" color="white" fontSize="lg">
            Carrinho de compras
          </Heading>
          <Center as="button" cursor="pointer" onClick={onClose}>
            <MdClose size={20} color={theme.colors.white} />
          </Center>
        </ModalHeader>

        <ModalBody
          paddingX={4}
          paddingY={5}
          display="flex"
          flexDir="column"
          gap={5}
        >
          {cart.length === 0 ? (
            <VStack mt={5} gap={3} alignItems="center">
              <Heading as="h2" fontSize="md" color="#333333" fontWeight="bold">
                Sua sacola está vazia
              </Heading>
              <Heading as="h3" fontSize="sm" color="gray.300">
                Adicione Itens
              </Heading>
            </VStack>
          ) : (
            cart.map((item) => <CardCart key={item.id} product={item} />)
          )}
        </ModalBody>

        <ModalFooter>
          <Flex flexDir="column" w="100%">
            <Box
              display="flex"
              justifyContent="space-between"
              borderTop="1px"
              borderColor="gray.100"
              paddingY={5}
            >
              <Heading as="h3" color="gray.600" fontSize="md">
                Total
              </Heading>

              <Heading as="span" color="gray.300" fontSize="sm">
                R$ {total.toFixed(2).toString().replace(".", ",")}
              </Heading>
            </Box>
            <Button
              onClick={handleDelete}
              bg="gray.100"
              color="gray.300"
              h="50px"
              _hover={{ bg: "gray.300", color: "gray.100" }}
            >
              Remover todos
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
