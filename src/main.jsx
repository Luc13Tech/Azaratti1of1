import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./context/LangContext.jsx";
import { AccountProvider } from "./context/AccountContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { LikesProvider } from "./context/LikesContext.jsx";
import App from "./App.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <AccountProvider>
          <CartProvider>
            <LikesProvider>
              <App />
            </LikesProvider>
          </CartProvider>
        </AccountProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
);
