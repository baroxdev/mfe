import React, { lazy, Suspense, useCallback } from "react";
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
  useHistory,
  useLocation,
} from "react-router-dom";

const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const onSignIn = useCallback(() => {
    setIsSignedIn(true);

    // navigate to the dashboard or home page after signing in
  }, []);

  const onSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header signedIn={isSignedIn} onSignOut={onSignOut} />
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/auth">
                <AuthAppLazy onSignIn={onSignIn} />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Suspense>
          </Switch>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}
