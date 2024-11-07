import { useMutation } from "@vue/apollo-composable";
export default async (mutation: any) => {
  const { mutate, onDone, onError } = useMutation(mutation);

  return { mutate, onDone, onError };
};
