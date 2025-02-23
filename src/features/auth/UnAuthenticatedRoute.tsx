import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { isAuthStore } from "./model";
import { useStore } from "@shared/lib/store";
import { REDIRECT_PATH_IF_AUTHENTICATED } from "@shared/config";

interface UnAuthenticatedRoutePropsWithComponent extends RouteProps {
  component: React.ComponentType<any>;
}

interface UnAuthenticatedRoutePropsWithChildren extends RouteProps {
  children: JSX.Element;
}

type UnAuthenticatedRouteProps =
  | UnAuthenticatedRoutePropsWithComponent
  | UnAuthenticatedRoutePropsWithChildren;

/**@description UnAuthenticatedRoute - renders only if isAuth === false */
export const UnAuthenticatedRoute = ({
  children,
  component: Component,
  ...rest
}: UnAuthenticatedRouteProps) => {
  const isAuth = useStore(isAuthStore);

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to={REDIRECT_PATH_IF_AUTHENTICATED} />
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={() =>
        !isAuth ? (
          <>{children}</>
        ) : (
          <Redirect to={REDIRECT_PATH_IF_AUTHENTICATED} />
        )
      }
    />
  );
};
