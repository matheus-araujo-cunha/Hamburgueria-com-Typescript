import { useToast } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";

interface ProductsProviderProps {
  children: ReactNode;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ProductsData {
  products: Product[];
  getProducts: (accessToken: string) => Promise<void>;
  searchProducts: (nameSearch: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
}

const ProductsContext = createContext<ProductsData>({} as ProductsData);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("must be Provider Products");
  }

  return context;
};

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const toast = useToast();

  const getProducts = useCallback(async (accessToken: string) => {
    try {
      const response = await api.get<Product[]>("/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(response.data);
    } catch (err) {
      toast({
        position: "top-right",
        title: "Oops",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  const searchProducts = (nameSearch: string) => {
    const response = products.filter(
      (product) =>
        product.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(nameSearch.toLowerCase())
    );
    setFilteredProducts(response);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        searchProducts,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
