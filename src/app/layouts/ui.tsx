import { NavLink } from "react-router-dom";

export interface NavItem {
  to: string;
  label: string;
  exact?: boolean;
}

export function NavItem({ to, label, exact = true }: NavItem) {
  return (
    <NavLink to={to} exact={exact} activeClassName="active">
      {label}
    </NavLink>
  );
}
