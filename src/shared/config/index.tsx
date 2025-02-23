import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

type RoutesPattern = {
  [key: string]: {
    absolutePath: string;
    lastPath: string;
    protectedType: RouteProtectedType;
    nameI18nKey: string;
    children?: RoutesPattern;
  };
};

// #TODO - create <TypedRoute protectedType={ROUTES.login.protectedType}/>
export enum RouteProtectedType {
  /**@description  renders only if isAuth === true */
  AuthOnly = "AuthOnly",
  /**@description  renders only if isAuth === false */
  UnAuthOnly = "UnAuthOnly",
  /**@description  renders always */
  Public = "Public",
}

export const ROUTES = {
  login: {
    absolutePath: "/login",
    lastPath: "login",
    protectedType: RouteProtectedType.UnAuthOnly,
    nameI18nKey: "",
  },

  home: {
    absolutePath: "/",
    lastPath: "",
    protectedType: RouteProtectedType.AuthOnly,
    nameI18nKey: "",
  },

  operations: {
    absolutePath: "/operations",
    lastPath: "operations",
    protectedType: RouteProtectedType.AuthOnly,
    nameI18nKey: "",
    children: {
      income: {
        absolutePath: "/operations/income",
        lastPath: "income",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      expense: {
        absolutePath: "/operations/expense",
        lastPath: "expense",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
    },
  },

  employees: {
    absolutePath: "/employees",
    lastPath: "employees",
    protectedType: RouteProtectedType.AuthOnly,
    nameI18nKey: "",
    children: {
      byId: {
        absolutePath: "/employees/:id",
        lastPath: ":id",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      stats: {
        absolutePath: "/employees/stats",
        lastPath: "stats",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      lifeInfo: {
        absolutePath: "/employees/life-info",
        lastPath: "life-info",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      progress: {
        absolutePath: "/employees/progress",
        lastPath: "progress",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      twoSegments: {
        absolutePath: "/employees/:id/info",
        lastPath: "info",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      withoutLayout: {
        absolutePath: "/employees/status-without-layout",
        lastPath: "status-without-layout",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
    },
  },

  profile: {
    absolutePath: "/profile",
    lastPath: "profile",
    protectedType: RouteProtectedType.AuthOnly,
    nameI18nKey: "",
  },

  other: {
    absolutePath: "/other",
    lastPath: "other",
    protectedType: RouteProtectedType.AuthOnly,
    nameI18nKey: "",
    children: {
      docs: {
        absolutePath: "/other/docs",
        lastPath: "docs",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
      stats: {
        absolutePath: "/other/stats",
        lastPath: "stats",
        protectedType: RouteProtectedType.AuthOnly,
        nameI18nKey: "",
      },
    },
  },
} as const satisfies RoutesPattern;

export const REDIRECT_PATH_IF_NOT_AUTHENTICATED = ROUTES.login.absolutePath;
export const REDIRECT_PATH_IF_AUTHENTICATED = ROUTES.home.absolutePath;

/**
 * @description Outputs the type for useParams, !!! copy of the ExtractRouteParams type from the react-router-dom function -->  generatePath<S extends string>(path: S, params?: ExtractRouteParams<S>): string
 * @example const params = useParams<InferRouteParams<"employees/:id">()
 *  // typeof params // {id:string}
 */
export type InferRouteParams<T extends string> = string extends T
  ? { [k in string]?: string }
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}/${infer Rest}`
    ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})${infer Modifier extends "?" | "+" | "*" | ""}`
      ? ExtractRouteOptionalParam<`${Param}${Modifier}`, string> &
          InferRouteParams<Rest>
      : ExtractRouteOptionalParam<ParamWithOptionalRegExp, string> &
          InferRouteParams<Rest>
    : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}`
      ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})${infer Modifier extends "?" | "+" | "*" | ""}`
        ? ExtractRouteOptionalParam<`${Param}${Modifier}`, string>
        : ExtractRouteOptionalParam<ParamWithOptionalRegExp, string>
      : {};

type ExtractRouteOptionalParam<
  T extends string,
  U = string | number | boolean,
> = T extends `${infer Param}?`
  ? { [k in Param]?: U }
  : T extends `${infer Param}*`
    ? { [k in Param]?: U }
    : T extends `${infer Param}+`
      ? { [k in Param]: U }
      : { [k in T]: U };
