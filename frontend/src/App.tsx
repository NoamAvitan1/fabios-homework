// App.tsx

import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";
import { UsersList } from "./components/user/UsersList";
import { NavBar } from "./components/header/NavBar";
import "./App.css"; // Import CSS file for theme styles

type ThemeContextType = {
  theme: string;
  changeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function App() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

  const changeTheme = ():void => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    })
  );

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <div className="app-provider" data-theme={theme}>
            <NavBar />
            <UsersList />
          </div>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeContext.Provider>
  );
}
