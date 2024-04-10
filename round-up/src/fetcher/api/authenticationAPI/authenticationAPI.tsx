import axios from "axios";
import {
  loginValueType,
  registerValueType,
} from "@/model/authenticationModel/authenticationModel";

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
      return response.data.token;
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
      return response.data.msg;
    } else {
      throw new Error("Failed to fetch register");
    }
  } catch (error) {
    console.log(error);
  }
};

export const userInformationFetcher = async (
  url: string,
  token: string | null
) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch user information");
    }
  } catch (error) {
    console.log(error);
  }
};
