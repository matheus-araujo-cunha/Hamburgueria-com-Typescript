import {
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  FormControl,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

import {
  useState,
  useCallback,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { IconType } from "react-icons";
import { useProducts } from "../../contexts/Products";

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  filled: "green.700",
  error: "gray.700",
  default: "gray.600",
};

interface InputProps extends ChakraInputProps {
  name?: string;
  error?: FieldError | null;
  icon?: IconType;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, icon: Icon, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  const { searchProducts } = useProducts();

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }

    return setVariation("default");
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup flexDir="column">
        <ChakraInput
          id={name}
          name={name}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          onBlurCapture={handleInputBlur}
          borderColor={inputVariation[variation]}
          size="lg"
          h="45px"
          borderWidth="2px"
          _focus={{ borderColor: "gray.600", bg: "gray.100" }}
          ref={ref}
          {...rest}
        />
        {Icon && (
          <InputRightElement
            as="button"
            type="submit"
            bg="green.500"
            color="white"
            mr="1"
            mt="1.5%"
            w="15%"
            borderRadius="8px"
            cursor="pointer"
          >
            <Icon />
          </InputRightElement>
        )}
        {!!error && (
          <FormErrorMessage color="red.500" fontSize="xs">
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
