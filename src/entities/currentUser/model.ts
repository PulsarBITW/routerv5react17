import { createStore } from "@shared/lib/store";
import { User } from "./types";

export const currentUserStore = createStore<User | null>(null);
