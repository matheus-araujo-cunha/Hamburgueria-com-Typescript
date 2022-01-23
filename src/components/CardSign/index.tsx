import { Flex, Center, Text } from "@chakra-ui/react";

import { FiShoppingBag } from "react-icons/fi";

import { theme } from "../../style/theme";

export const CardSign = () => {
  return (
    <Flex
      h="95px"
      alignItems="center"
      w={["90%", "90%", "70%", "70%"]}
      paddingX="2"
      paddingY="10"
      gap="3"
      borderWidth="2px"
      borderColor="gray.0"
      borderRadius="8px"
      boxShadow="base"
    >
      <Center h="60px" w="20%" bg="#27AE601A" p="1" borderRadius="5px">
        <FiShoppingBag size="20px" color={theme.colors.green[500]} />
      </Center>
      <Text fontSize="xs" w="75%" color="gray.300">
        A vida é como um sanduíche, é preciso recheá-la com os <b> melhores </b>
        ingredientes.
      </Text>
    </Flex>
  );
};
