import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";
import { getMe, login as loginRequest, register as registerRequest } from "../api/auth";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";
import type { LoginPayload, RegisterPayload, User } from "../types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User | null>;
  register: (payload: RegisterPayload) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMe()
      .then((me) => {
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const tokenResponse = await loginRequest(payload);
    localStorage.setItem(TOKEN_KEY, tokenResponse.access_token);

    const me = await getMe();
    setUser(me);
    localStorage.setItem(USER_KEY, JSON.stringify(me));
    return me;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    await registerRequest(payload);
    const me = await login({ email: payload.email, password: payload.password });
    return me;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    window.location.assign("/login");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
