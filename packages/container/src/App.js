import React from "react";
import { mount } from "marketing/Marketing";
import MarketingApp from "./components/MarketingApp";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}
