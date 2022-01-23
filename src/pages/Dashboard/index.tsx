import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/Cart";
import { Header } from "./Header";
import { ListProducts } from "./ListProducts";
import { ModalCart } from "./ModalCart";

export const Dashboard = () => {
  const { signOut, accessToken, user } = useAuth();

  const { getCart } = useCart();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getCart(accessToken, Number(user.id));
  }, [getCart]);

  return (
    <>
      <ModalCart isOpen={isOpen} onClose={onClose} />

      <Flex flexDir="column">
        <Header onOpen={onOpen} />
        <ListProducts />
      </Flex>
    </>
  );
};
