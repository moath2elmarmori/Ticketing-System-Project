import { toast } from "react-toastify";

const mutationHandler = async (mutationFn, data, toastText) => {
  try {
    const responseData = await mutationFn({ variables: data });
    toast.success(toastText);
    return responseData;
  } catch (error) {
    toast.error(error.message);
  }
};

export default mutationHandler;
