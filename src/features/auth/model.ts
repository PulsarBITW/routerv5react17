import {
  User,
  UserListByLogin,
  currentUserStore,
} from "@entities/currentUser";
import { createComputedStore } from "@shared/lib/store";
import { wait } from "@shared/lib/wait";

export interface Credentials {
  login: string;
  password: string;
}

export const isAuthStore = createComputedStore(
  currentUserStore,
  (user) => user !== null
);

export const authenticateByCredentials = async ({
  login,
  password,
}: Credentials): Promise<User> => {
  await wait(500);

  const user = UserListByLogin.get(login);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return user;
};

export const mockLogin = (user: User) => {
  currentUserStore.setState(user);
};

export const logout = () => {
  currentUserStore.setState(null);
};
