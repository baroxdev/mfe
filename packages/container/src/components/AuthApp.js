import React, { useRef, useEffect } from "react";
import { mount } from "auth/Auth";
import { useHistory } from "react-router-dom";

export default function AuthApp() {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onCallback: ({ pathname: nextPathname }) => {
        if (history.location.pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      initialEntries: [history.location],
    });

    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref} />;
}
