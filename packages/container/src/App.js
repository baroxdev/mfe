import React, { lazy, Suspense } from "react";
import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/auth" component={AuthAppLazy} />
              <Route path="/" component={MarketingApp} />
            </Suspense>
          </Switch>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}
