import React from "react";
import { createBrowserHistory, createMemoryHistory } from "history";
import ReactDOM from "react-dom";
import App from "./App";

const mount = (
  el,
  { onCallback, defaultHistory, initialEntries, onSignIn },
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries,
    });

  if (onCallback) {
    history.listen(onCallback);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
