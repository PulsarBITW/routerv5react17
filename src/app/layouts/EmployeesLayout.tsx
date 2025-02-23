import { ReactNode } from "react";

import { ROUTES } from "@shared/config";
import { NavItem } from "./ui";

export function EmployeesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavItem to={ROUTES.employees.absolutePath} label="All Employees" />
          </li>
          <li>
            <NavItem
              to={ROUTES.employees.children.stats.absolutePath}
              label="Statistics"
            />
          </li>
          <li>
            <NavItem
              to={ROUTES.employees.children.lifeInfo.absolutePath}
              label="Life Info"
            />
          </li>
          <li>
            <NavItem
              to={ROUTES.employees.children.progress.absolutePath}
              label="Progress"
            />
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
