import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams } from "./components/ui/background-beams.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BackgroundBeams className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 -z-30">
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
        {/* change background beams color to dark */}
      </BackgroundBeams>
    </BrowserRouter>
  </React.StrictMode>
);
