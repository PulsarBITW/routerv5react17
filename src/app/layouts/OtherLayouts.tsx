import { ReactNode } from "react";

import { ROUTES } from "@shared/config";
import { NavItem } from "./ui";

export function OtherLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavItem
              to={ROUTES.other.children.docs.absolutePath}
              label="Documents"
            />
          </li>
          <li>
            <NavItem
              to={ROUTES.other.children.stats.absolutePath}
              label="Statistics"
            />
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
