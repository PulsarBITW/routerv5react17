import { User } from "./types";

export const UserListByLogin = new Map<string, User>();

export const Bob: User = {
  id: "1",
  name: "Bob",
  login: "Bob",
  password: "123",
} as const;
export const John: User = {
  id: "2",
  name: "John",
  login: "John",
  password: "123",
} as const;
export const MILFHunter: User = {
  id: "3",
  name: "Milf Hunter",
  login: "MILFHunter",
  password: "123",
} as const;

UserListByLogin.set(Bob.login, Bob);
UserListByLogin.set(John.login, John);
UserListByLogin.set(MILFHunter.login, MILFHunter);
