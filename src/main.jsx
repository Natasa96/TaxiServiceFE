import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClient.js";
import AppNavigation from "./router/AppNavigation.jsx";
import { DataProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <ChakraProvider>
          <Router>
            <AppNavigation />
          </Router>
        </ChakraProvider>
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
