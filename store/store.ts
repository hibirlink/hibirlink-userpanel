import { User } from "firebase/auth";
import { defineStore } from "pinia";

interface UserInterface {
  email: string | null;
  displayName?: string | null;
}
export const useAppStore = defineStore({
  id: "hibirlink-user-panel-app-store",
  state: () => {
    return {
      token: null as string | null,
      user: null as UserInterface | null,
    };
  },

  actions: {
    setToken(token: string | null) {
      this.token = token;
    },
    setUser(user: UserInterface | null) {
      this.user = user;
    },
  },
});
