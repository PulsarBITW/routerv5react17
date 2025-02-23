import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAuthStore } from "./model";
import { useStore } from "@shared/lib/store";
import { REDIRECT_PATH_IF_NOT_AUTHENTICATED } from "@shared/config";

interface AuthenticatedPropsWithComponent extends RouteProps {
  component: React.ComponentType<any>;
}

interface AuthenticatedPropsWithChildren extends RouteProps {
  children: JSX.Element;
}

type AuthenticatedRouteProps =
  | AuthenticatedPropsWithComponent
  | AuthenticatedPropsWithChildren;

/**@description AuthenticatedRoute - renders only if isAuth === true */
export const AuthenticatedRoute = ({
  children,
  component: Component,
  ...rest
}: AuthenticatedRouteProps) => {
  const isAuth = useStore(isAuthStore);

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to={REDIRECT_PATH_IF_NOT_AUTHENTICATED} />
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          <>{children}</>
        ) : (
          <Redirect to={REDIRECT_PATH_IF_NOT_AUTHENTICATED} />
        )
      }
    />
  );
};
