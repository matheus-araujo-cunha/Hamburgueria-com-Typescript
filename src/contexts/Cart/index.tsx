import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";

interface CartProviderProps {
  children: ReactNode;
}

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  img: string;
}

interface CartItem {
  id: number;
  category: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
  userId: number;
}

interface CartData {
  cart: CartItem[];
  getCart: (accessToken: string, userId: number) => Promise<void>;
  addToCart: (
    item: Product,
    accessToken: string,
    userId: string
  ) => Promise<void>;
  sumQuantity: (item: CartItem, accessToken: string) => Promise<void>;
  removeQuantity: (item: CartItem, accessToken: string) => Promise<void>;
  deleteFromCart: (item: CartItem, accessToken: string) => Promise<void>;
  searchItemCart: (itemName: string, accessToken: string) => Promise<void>;
}

const CartContext = createContext<CartData>({} as CartData);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("must be Provider Cart");
  }

  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = useCallback(async (accessToken: string, userId: number) => {
    try {
      const response = await api.get(`/cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCart(response.data);
    } catch (err) {}
  }, []);

  const sumQuantity = useCallback(
    async (item: CartItem, accessToken: string) => {
      item.quantity += 1;

      const itemQuantitySum = { ...item };

      api
        .patch(`/cart/${item.id}`, itemQuantitySum, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          getCart(accessToken, item.userId);
        });
    },
    []
  );

  const addToCart = useCallback(
    async (item: Product, accessToken: string, userId: string) => {
      const filterItemCart = cart.filter(
        (itemCart) => itemCart.name === item.name
      );

      if (filterItemCart.length === 0) {
        const newItemCart = {
          ...{ ...item },
          ...{ quantity: 1, userId: userId },
        };

        api
          .post("/cart", newItemCart, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setCart((oldCart) => [...oldCart, response.data]);
          });
      } else {
      }
    },
    []
  );

  const removeQuantity = useCallback(
    async (item: CartItem, accessToken: string) => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        const itemRemoveQuantity = { ...item };
        return api
          .patch(`/cart/${item.id}`, itemRemoveQuantity, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((_) => getCart(accessToken, item.userId));
      }
      deleteFromCart(item, accessToken);
      getCart(accessToken, item.userId);
    },
    []
  );

  const deleteFromCart = useCallback(
    async (item: CartItem, accessToken: string) => {
      const cartFiltered = cart.filter((itemCart) => item.id !== itemCart.id);
      setCart(cartFiltered);

      api
        .delete(`/cart/${item.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          getCart(accessToken, item.userId);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const searchItemCart = useCallback(
    async (itemName: string, accessToken: string) => {
      const response = await api.get(`/products?name_like=${itemName}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCart(response.data);
    },
    []
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        deleteFromCart,
        sumQuantity,
        removeQuantity,
        searchItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
