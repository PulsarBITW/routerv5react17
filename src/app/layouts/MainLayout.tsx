import { isAuthStore } from "@features/auth";
import { ROUTES } from "@shared/config";
import { useStore } from "@shared/lib/store";
import { NavItem } from "./ui";

const AuthItemsList: NavItem[] = [
  { to: ROUTES.home.absolutePath, label: "Home", exact: true },
  { to: ROUTES.profile.absolutePath, label: "Profile", exact: false },
  { to: ROUTES.employees.absolutePath, label: "Employees", exact: false },
  { to: ROUTES.operations.absolutePath, label: "Operations", exact: false },
  { to: ROUTES.other.absolutePath, label: "Other", exact: false },
];

const UnAuthItemsList: NavItem[] = [
  { to: ROUTES.login.absolutePath, label: "Login", exact: false },
];

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const isAuth = useStore(isAuthStore);

  const linksList = isAuth ? AuthItemsList : UnAuthItemsList;

  return (
    <>
      <nav>
        <ul>
          {linksList.map((link) => (
            <li key={link.to}>
              <NavItem {...link} />
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
}
