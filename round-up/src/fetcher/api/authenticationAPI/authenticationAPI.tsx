import axios from "axios";
import {
  loginValueType,
  registerValueType,
} from "@/model/context/authentication/authentication";

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
      throw new Error("Failed to fetch login");
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerFetcher = async (
  url: string,
  {
    email,
    firstName,
    lastName,
    phoneNumber,
    faculty,
    studentID,
    password,
  }: registerValueType
) => {
  try {
    const response = await axios.post(
      url,
      {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        faculty: faculty,
        studentID: studentID,
        password: password,
      },
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
      throw new Error("Failed to fetch register");
    }
  } catch (error) {
    console.log(error);
  }
};
