import React, { lazy, Suspense, useCallback, useEffect } from "react";
import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import {
  BrowserRouter,
  Switch,
  Route,
  Router,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const DashboardLazyApp = lazy(() => import("./components/DashboardApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const onSignIn = useCallback(() => {
    setIsSignedIn(true);
    history.push("/dashboard");
  }, [history]);

  const onSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={onSignOut} />
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/auth">
                <AuthAppLazy onSignIn={onSignIn} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazyApp />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Suspense>
          </Switch>
        </div>
      </Router>
    </StylesProvider>
  );
}
