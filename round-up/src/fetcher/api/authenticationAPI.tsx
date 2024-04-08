import axios from "axios";
import { loginValueType } from "@/model/context/authentication/authentication";

export const loginFetcher = async (
  url: string,
  { email, password }: loginValueType
) => {
  try {
    const response = await axios.post(
      url,
      { email: email, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      throw new Error("Failed to create course");
    }
  } catch (error) {
    console.log(error);
  }
};
