import { ReactNode } from "react";

import { ROUTES } from "@shared/config";
import { NavItem } from "./ui";

export function OperationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavItem to={ROUTES.operations.absolutePath} label="All" />
          </li>
          <li>
            <NavItem
              to={ROUTES.operations.children.income.absolutePath}
              label="Income"
            />
          </li>
          <li>
            <NavItem
              to={ROUTES.operations.children.expense.absolutePath}
              label="Expenses"
            />
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
