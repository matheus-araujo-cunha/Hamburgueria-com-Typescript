import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  useBreakpointValue,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BallSkeleton } from "../../components/BallSkeleton";
import { CardSign } from "../../components/CardSign";

import { Link as LinkReact } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const SignUpSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .max(30, "Máximo de 25 caracteres"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
    confirm_password: yup
      .string()
      .required("Confirmação obrigatória")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(SignUpSchema),
  });

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    setLoading(true);

    api
      .post("/register", { name, email, password })
      .then(() => {
        history.push("/");
        toast({
          position: "top-right",
          title: "Yess!",
          description: "Cadastrado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
        marginTop={["3", "3", "0"]}
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        direction={["column-reverse", "column-reverse", "row", "row"]}
      >
        <Grid
          marginTop={["10", "10", "0"]}
          w={["100%", "100%", "40%", "40%"]}
          h={["200px", "200px", "420px"]}
          borderColor="gray.0"
          paddingY={["2", "3", "8"]}
          display="flex"
          flexDir="column"
          alignItems={["center", "center", "flex-start", "flex-start"]}
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
            <Flex w="100%">
              <BallSkeleton repeatCount={18} />
            </Flex>
          )}
        </Grid>

        <Grid
          as="form"
          onSubmit={handleSubmit(handleSignUp)}
          w={["92%", "92%", "40%", "40%"]}
          h="480px"
          maxW="460px"
          border="1px solid"
          borderColor="gray.0"
          paddingY="6"
          paddingX="5"
          borderRadius="5px"
          boxShadow="base"
        >
          <Box
            alignSelf="flex-start"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="3"
          >
            <Heading as="h2" fontSize="lg">
              Cadastro
            </Heading>
            <Link as={LinkReact} to="/">
              Retornar para o login
            </Link>
          </Box>
          <VStack spacing={5} display="flex" flexDir="column">
            <Input
              placeholder="Nome"
              {...register("name")}
              error={errors.name}
            />
            <Input
              placeholder="Email"
              {...register("email")}
              error={errors.email}
            />
            <Input
              placeholder="Senha"
              {...register("password")}
              error={errors.password}
            />
            <Input
              placeholder="Confirme a senha"
              {...register("confirm_password")}
              error={errors.confirm_password}
            />
            <Box w="100%" h="30%" display="flex" alignItems="flex-end">
              <Button
                type="submit"
                isLoading={loading}
                w="100%"
                mt="1"
                h="50px"
                bg="gray.100"
                color="gray.300"
                _hover={{ bg: "gray.300", color: "gray.100" }}
              >
                Cadastrar
              </Button>
            </Box>
          </VStack>
        </Grid>
      </Stack>
    </Flex>
  );
};
