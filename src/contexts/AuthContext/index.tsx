import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  name: string;
  id: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  accessToken: string;
  user: User;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "must be userAuth must be used within an AuthProvider AuthContext"
    );
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Hamburgueria:accessToken");
    const user = localStorage.getItem("@Hamburgueria:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@Hamburgueria:accessToken", accessToken);
    localStorage.setItem("@Hamburgueria:user", JSON.stringify(user));

    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Hamburgueria:accessToken");
    localStorage.removeItem("@Hamburgueria:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
