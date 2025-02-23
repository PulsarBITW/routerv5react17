import ReactDOM from "react-dom";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import { history, ROUTES } from "@shared/config";
import { ErrorBoundary } from "@shared/errorBoundary";
import { Bob } from "@entities/currentUser";
import {
  authenticateByCredentials,
  AuthenticatedRoute,
  mockLogin,
  UnAuthenticatedRoute,
} from "@features/auth";
import {
  DocsPage,
  EmployeesByIdPage,
  EmployeesLifeInfoPage,
  EmployeesPage,
  EmployeesProgressPage,
  EmployeesStatsPage,
  EmployeesStatusWithoutLayout,
  EmployeesTwoSegments,
  ExpensePage,
  HomePage,
  IncomePage,
  LoginPage,
  NotFoundPage,
  OperationsPage,
  ProfilePage,
  StatsPage,
} from "@pages";
import {
  EmployeesLayout,
  MainLayout,
  OperationsLayout,
  OtherLayout,
} from "./layouts";

import "./index.css";

async function tryAuth() {
  try {
    const user = await authenticateByCredentials({
      login: Bob.login,
      password: Bob.password,
    });

    // throw new Error("s");
    mockLogin(user);
  } catch {}
}

tryAuth().finally(() =>
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.getElementById("root")
  )
);

/**@description "Flat structure of the application's routes" */

function App() {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Switch>
            {/** @Authenticated_Route "/" */}
            <AuthenticatedRoute
              exact
              path={ROUTES.home.absolutePath}
              component={HomePage}
            />

            {/** @Authenticated_Route "/profile" */}
            <AuthenticatedRoute
              exact
              path={ROUTES.profile.absolutePath}
              component={ProfilePage}
            />

            {/** @Authenticated_Route "/operations" */}
            <AuthenticatedRoute path={ROUTES.operations.absolutePath}>
              <Switch>
                <Route
                  path={[
                    ROUTES.operations.absolutePath,
                    ROUTES.operations.children.income.absolutePath,
                    ROUTES.operations.children.expense.absolutePath,
                  ]}
                  exact
                >
                  <OperationsLayout>
                    <Switch>
                      <Route
                        exact
                        path={ROUTES.operations.absolutePath}
                        component={OperationsPage}
                      />
                      <Route
                        exact
                        path={ROUTES.operations.children.income.absolutePath}
                        component={IncomePage}
                      />
                      <Route
                        exact
                        path={ROUTES.operations.children.expense.absolutePath}
                        component={ExpensePage}
                      />
                    </Switch>
                  </OperationsLayout>
                </Route>

                <Route component={NotFoundPage} />
              </Switch>
            </AuthenticatedRoute>

            {/** @Authenticated_Route "/employees" */}
            <AuthenticatedRoute path={ROUTES.employees.absolutePath}>
              <Switch>
                {/* With layout */}
                <Route
                  exact
                  /** Don't forget to specify the route that should be rendered with a layout. */
                  path={[
                    ROUTES.employees.absolutePath,
                    ROUTES.employees.children.stats.absolutePath,
                    ROUTES.employees.children.lifeInfo.absolutePath,
                    ROUTES.employees.children.progress.absolutePath,
                    ROUTES.employees.children.twoSegments.absolutePath,
                  ]}
                >
                  <EmployeesLayout>
                    <Switch>
                      <Route
                        exact
                        path={ROUTES.employees.absolutePath}
                        component={EmployeesPage}
                      />
                      <Route
                        exact
                        path={ROUTES.employees.children.stats.absolutePath}
                        component={EmployeesStatsPage}
                      />
                      <Route
                        exact
                        path={ROUTES.employees.children.lifeInfo.absolutePath}
                        component={EmployeesLifeInfoPage}
                      />
                      <Route
                        exact
                        path={ROUTES.employees.children.progress.absolutePath}
                        component={EmployeesProgressPage}
                      />
                      {/* Example where the route ROUTES.employeesById (:id) is rendered
                      without a layout, while ROUTES.employeesTwoSegments (:id/info)
                      is rendered with a layout. 
                      */}
                      <Route
                        exact
                        path={
                          ROUTES.employees.children.twoSegments.absolutePath
                        }
                        component={EmployeesTwoSegments}
                      />
                    </Switch>
                  </EmployeesLayout>
                </Route>
                {/* Without layout */}
                <Route
                  exact
                  path={ROUTES.employees.children.withoutLayout.absolutePath}
                  component={EmployeesStatusWithoutLayout}
                />
                <Route
                  exact
                  path={ROUTES.employees.children.byId.absolutePath}
                  component={EmployeesByIdPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </AuthenticatedRoute>

            {/** @Authenticated_Route "/other" */}
            <AuthenticatedRoute path={ROUTES.other.absolutePath}>
              <OtherLayout>
                {/* /profile default for /other */}
                <Switch>
                  <Route
                    exact
                    path={ROUTES.other.children.docs.absolutePath}
                    component={DocsPage}
                  />
                  <Route
                    exact
                    path={ROUTES.other.children.stats.absolutePath}
                    component={StatsPage}
                  />
                  <Redirect to={ROUTES.other.children.docs.absolutePath} />
                </Switch>
              </OtherLayout>
            </AuthenticatedRoute>

            {/**  @UnAuthenticated_Route = "/login" */}
            <UnAuthenticatedRoute
              path={ROUTES.login.absolutePath}
              exact
              component={LoginPage}
            />

            <Route component={NotFoundPage} />
          </Switch>
        </MainLayout>

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
