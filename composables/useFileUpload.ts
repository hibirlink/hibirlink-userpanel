import {
  getStorage,
  uploadString,
  getDownloadURL,
  ref as storageReference,
} from "firebase/storage";

export default async function (files: any) {
  const singleImageupload = async (file: any) => {
    const storage = getStorage();
    const getStorageReference = storageReference(
      storage,
      `images+${file.name}`
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
        const url = await singleImageupload(e);
        return url;
      })
    );
    return { urls, error: null };
  } catch (error) {
    console.log(error);
    return { urls: null, error };
  }
}
