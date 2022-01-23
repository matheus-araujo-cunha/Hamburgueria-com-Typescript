import {
  Box,
  Flex,
  Heading,
  Center,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";

import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { theme } from "../../style/theme";

import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/Cart";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/Products";

interface SearchData {
  name: string;
}

interface HeaderProps {
  onOpen: () => void;
}

export const Header = ({ onOpen }: HeaderProps) => {
  const { register, handleSubmit } = useForm<SearchData>();

  const [mobalInput, setMobalInput] = useState(false);

  const { cart } = useCart();
  const { searchProducts, filteredProducts } = useProducts();
  const { signOut, accessToken } = useAuth();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const handleSearch = ({ name }: SearchData) => {
    searchProducts(name);
  };

  useEffect(() => {
    if (isWideVersion) {
      setMobalInput(false);
    }
  }, [isWideVersion]);

  return (
    <Flex
      justifyContent="space-between"
      bg="gray.0"
      h="65px"
      mb={10}
      alignItems="center"
    >
      {!mobalInput && (
        <Box
          display="flex"
          ml={["3", "3", "10", "10"]}
          gap="10px"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Heading
            as="h2"
            color="gray.900"
            fontSize={["xl", "xl", "3xl", "3xl"]}
          >
            Burguer
          </Heading>
          <Heading as="h2" fontSize={["lg", "lg", "xl", "xl"]} color="red.500">
            Kenzie
          </Heading>
        </Box>
      )}
      <Flex
        mr={["3", "3", "10", "10"]}
        h="inherit"
        as="form"
        onSubmit={handleSubmit(handleSearch)}
        w={mobalInput === true ? "100%" : "auto"}
        gap={5}
        alignItems="center"
      >
        {isWideVersion ? (
          <>
            <Input
              {...register("name")}
              placeholder="Digitar Pesquisa"
              size="md"
              icon={BiSearchAlt2}
              h="50px"
              borderColor="gray.100"
            />
          </>
        ) : (
          <>
            {!mobalInput && (
              <BiSearchAlt2
                onClick={() => setMobalInput(true)}
                size="30"
                cursor="pointer"
              />
            )}

            {mobalInput && (
              <Input
                ml="2"
                mr="2"
                {...register("name")}
                placeholder="Digitar Pesquisa"
                size="md"
                icon={BiSearchAlt2}
                h="50px"
                borderColor="gray.100"
                onBlur={() => setMobalInput(false)}
              />
            )}
          </>
        )}

        {!mobalInput && (
          <>
            <Box
              position="relative"
              h="inherit"
              display="flex"
              alignItems="center"
              w={["30%", "30%", "12%", "12%"]}
            >
              <FaShoppingCart
                onClick={onOpen}
                cursor="pointer"
                size="25"
                color={theme.colors.gray[10]}
              />
              <Center
                top="1"
                right="0"
                position="absolute"
                bg="green.500"
                color="white"
                borderRadius="7px"
                w="20px"
                fontWeight="bold"
              >
                {!!cart ? cart.length : 0}
              </Center>
            </Box>
            <FiLogOut
              onClick={signOut}
              cursor="pointer"
              size="30"
              color={theme.colors.gray[10]}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
