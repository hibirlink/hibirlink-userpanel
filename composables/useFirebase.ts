import {
  getAuth,
  signOut,
  signInWithCustomToken,
  getIdToken,
} from "firebase/auth";
import {
  getStorage,
  uploadString,
  getDownloadURL,
  ref as storageReference,
} from "firebase/storage";
import { useAppStore } from "~/store/store";

export const signInWizToken = async (token: string) => {
  try {
    const auth = getAuth();
    const store = useAppStore();
    await signInWithCustomToken(auth, token);
    const userToken = await auth.currentUser?.getIdToken(true);
    updateState(userToken || null);
  } catch (error) {}
};

export const updateState = (id_token: string | null) => {
  const auth = getAuth();
  const store = useAppStore();
  localStorage.setItem("userID", auth.currentUser?.uid as string);
  store.setToken(id_token);
  store.setUser({
    email: auth.currentUser?.email || null,
    displayName: auth.currentUser?.displayName,
  });
};

export const getUserIdToken = async () => {
  const auth = getAuth();
  if (auth.currentUser !== null)
    return await getIdToken(auth.currentUser, true);
  return null;
};

export const storeUserToken = async () => {
  try {
    const store = useAppStore();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let id_token = null;
    if (currentUser) {
      id_token = await getIdToken(currentUser, true);
    }
    store.setToken(id_token);
    useCookie("token").value = id_token;
  } catch (error) {}
};

export const uploadImages = async (files: any, path: string) => {
  const singleImageUpload = async (file: any) => {
    const storage = getStorage();
    const getStorageReference = storageReference(
      storage,
      `${path}/${file.name}`
    );
    const upload = await uploadString(
      getStorageReference,
      file.base64,
      "base64"
    );
    const url = await getDownloadURL(getStorageReference);
    return url;
  };
  try {
    const urls = await Promise.all(
      files.map(async (e: any) => {
        const url = await singleImageUpload(e);
        return url;
      })
    );
    return { urls, error: null };
  } catch (error) {
    return { urls: null, error };
  }
};
