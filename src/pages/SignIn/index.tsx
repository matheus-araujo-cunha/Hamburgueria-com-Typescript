import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BallSkeleton } from "../../components/BallSkeleton";
import { CardSign } from "../../components/CardSign";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Form/Input";

interface SignInData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();
  const { signIn } = useAuth();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const signInSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then(() => {
        history.push("/dashboard");
        toast({
          position: "top-right",
          title: "Boaa!!",
          description: "Logado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          position: "top-right",
          title: "Ops!",
          description: "Algo deu errado!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      align="center"
      h={["auto", "auto", "100vh", "100vh"]}
    >
      <Stack
        w="100%"
        display="flex"
        justifyContent="center"
        spacing={1}
        direction={["column-reverse", "column-reverse", "row", "row"]}
      >
        <Grid
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          w={["92%", "92%", "40%", "40%"]}
          h="460px"
          maxW="460px"
          ml={["4", "4", "0"]}
          mr={["4", "4", "0"]}
          border="1px solid"
          borderColor="gray.0"
          paddingY="6"
          paddingX="5"
          borderRadius="5px"
          boxShadow="base"
        >
          <Heading as="h2" fontSize="lg" marginBottom="2">
            Login
          </Heading>
          <VStack spacing={5}>
            <Input
              placeholder="E-mail"
              {...register("email")}
              error={errors.email}
            />
            <Input
              type="password"
              placeholder="Senha"
              {...register("password")}
              error={errors.password}
            />
          </VStack>
          <Button
            type="submit"
            isLoading={loading}
            h="50px"
            w="100%"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.300" }}
          >
            Logar
          </Button>
          <Flex flexDir="column" justifyContent="space-around">
            <Text align="center" color="gray.50">
              Crie sua conta para saborear muitas delícias e matar a sua fome!
            </Text>
            <Button
              onClick={() => {
                setLoading(true);
                history.push("/signup");
                setLoading(false);
              }}
              isLoading={loading}
              mt="1"
              h="50px"
              bg="gray.100"
              color="gray.300"
              _hover={{ bg: "gray.300", color: "gray.100" }}
            >
              Cadastrar
            </Button>
          </Flex>
        </Grid>

        <Grid
          marginTop={["20", "20", "0"]}
          w={["100%", "100%", "40%", "40%"]}
          h={["200px", "200px", "420px"]}
          borderColor="gray.0"
          paddingY={["2", "3", "8"]}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box
            display="flex"
            w={["90%", "90%", "70%"]}
            gap="10px"
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Heading as="h1" color="gray.900" fontSize="3xl">
              Burguer
            </Heading>
            <Heading as="h2" fontSize="xl" color="red.500">
              Kenzie
            </Heading>
          </Box>
          <CardSign />
          {isWideVersion && (
            <Flex w="100%" justifyContent="flex-start" ml="30%">
              <BallSkeleton repeatCount={18} />
            </Flex>
          )}
        </Grid>
      </Stack>
    </Flex>
  );
};
