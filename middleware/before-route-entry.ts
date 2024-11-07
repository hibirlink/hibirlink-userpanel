import { User } from "firebase/auth";
import { useAppStore } from "~/store/store";
import { signInWizToken } from "@/composables/useFirebase";

interface UserInterface {
  uid: string;
  email?: string;
  displayName?: string;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAppStore();
  let cookieToken = useCookie("token", {sameSite: false}).value;
   cookieToken = localStorage.getItem("token")
  const router = useRouter();

  if (!store.token) {
    if (cookieToken) {
      try {
        const config = useRuntimeConfig().public;
        const result = await useFetch(
          `${config.WEB_HOOK_BASE_URL}/verifyToken`,
          {
            method: "POST",
            headers: { action_secret: config.ACTION_SECRET_KEY },
            body: {
              input: { credentials: { id_token: cookieToken } },
            },
          }
        );

        if (result.data.value) {
          const cResult = result.data.value as {
            user: UserInterface;
            token: string;
          };
          await signInWizToken(cResult.token);
        }
        if (result.error.value) {
          return abortNavigation("Internal Server Error: User Not Logged In 1");
        }
      } catch (error) {
        return abortNavigation(
          "Internal Server Error: User Not Logged In 2" + error
        );
      }
    } else {
      return abortNavigation("Internal Server Error: User Not Logged In 3");
    }
  }
});
