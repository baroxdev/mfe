import React, { useRef, useEffect } from "react";
import { mount } from "marketing/Marketing";
import { useHistory } from "react-router-dom";
export default function MarketingApp() {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onCallback: ({ pathname: nextPathname }) => {
        if (history.location.pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      defaultPathname: history.location.pathname,
    });

    history.listen(onParentNavigate);
  }, [history]);

  return <div ref={ref} />;
}
