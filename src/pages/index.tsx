import { generatePath, Link, useParams } from "react-router-dom";

import { InferRouteParams, ROUTES } from "@shared/config";
import { logout } from "@features/auth";
export { LoginPage } from "./Login/page";

export function HomePage() {
  return (
    <div className="column-container">
      <h1>Home</h1>
      <div>Template for React 17 + React Router V5</div>
    </div>
  );
}

export function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>;
}

export function OperationsPage() {
  return <h1>All Operations</h1>;
}

export function IncomePage() {
  return <h1>Income</h1>;
}

export function ExpensePage() {
  return <h1>Expenses</h1>;
}

export function EmployeesPage() {
  const employeesList = [
    { id: 1, name: "Bob" },
    { id: 2, name: "John" },
    { id: 3, name: "Hanson" },
  ];

  return (
    <div className="column-container">
      <h1>Employees</h1>
      <div className="column-container">
        {employeesList.map((employee) => (
          <Link
            key={employee.id}
            to={generatePath(ROUTES.employees.children.byId.absolutePath, {
              id: employee.id,
            })}
          >
            <span>{employee.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function EmployeesByIdPage() {
  const dynamicSegments =
    useParams<
      InferRouteParams<typeof ROUTES.employees.children.byId.absolutePath>
    >();

  return (
    <div className="column-container">
      <Link to={ROUTES.employees.absolutePath}>
        <span>{"<< Employee List"}</span>
      </Link>
      <h1>{`Employee # ${dynamicSegments.id}`}</h1>
      <Link
        to={generatePath(ROUTES.employees.children.twoSegments.absolutePath, {
          id: dynamicSegments.id,
        })}
      >
        Information
      </Link>
    </div>
  );
}

export function EmployeesTwoSegments() {
  const dynamicSegments =
    useParams<
      InferRouteParams<
        typeof ROUTES.employees.children.twoSegments.absolutePath
      >
    >();

  return (
    <div className="column-container">
      <Link to={ROUTES.employees.absolutePath}>
        <span>{"<< Employee List"}</span>
      </Link>
      <h1>{`Information for Employee # ${dynamicSegments.id}`}</h1>
    </div>
  );
}

export function EmployeesStatusWithoutLayout() {
  return <h1>Employee Page Without Layout</h1>;
}
export function EmployeesStatsPage() {
  return <h1>Employee Statistics</h1>;
}

export function EmployeesLifeInfoPage() {
  return <h1>Employee Life Information</h1>;
}

export function EmployeesProgressPage() {
  return <h1>Employee Progress</h1>;
}

export function ProfilePage() {
  return (
    <div className="column-container">
      <h1>Profile</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export function DocsPage() {
  return <h1>Documents</h1>;
}

export function StatsPage() {
  return <h1>Statistics</h1>;
}
