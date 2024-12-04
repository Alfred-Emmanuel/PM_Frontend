import React, { createContext, useState, useContext, useEffect } from "react";
import { IUser, ITokens, IUserContextType } from "../config/interfaces";

// Create context with default values
const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tokens, setTokens] = useState<ITokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (tokens) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
    }
  }, [tokens]);

  // Load user and tokens from localStorage on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTokens = localStorage.getItem("tokens");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
    setIsLoading(false);
  }, []);

  // Function to refresh the token using the refresh token
  const refreshToken = async () => {
    if (tokens?.refresh_token) {
      try {
        const response = await fetch("/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: tokens.refresh_token }),
        });

        const data = await response.json();
        if (data.code === 200) {
          setTokens(data.data.tokens); // Update tokens with new access token
        } else {
          console.error("Token refresh failed");
        }
      } catch (error) {
        console.error("Error refreshing token", error);
      }
    }
  };

  // Optionally, useEffect to refresh the token when the access token expires
  useEffect(() => {
    if (tokens?.access_token) {
      const tokenExpiration = new Date(0).setSeconds(
        JSON.parse(atob(tokens.access_token.split(".")[1])).exp
      );
      const now = new Date().getTime();

      // If the access token is about to expire, refresh it
      if (tokenExpiration - now < 5 * 60 * 1000) {
        refreshToken();
      }
    }
  }, [tokens]);

  return (
    <UserContext.Provider
      value={{ user, tokens, setUser, setTokens, refreshToken, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
