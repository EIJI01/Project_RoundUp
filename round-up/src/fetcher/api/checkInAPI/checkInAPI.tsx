import { anonymousCheckInInfoType } from "@/model/checkInModel/checkInModel";
import axios from "axios";

export const checkInWithTokenAndInfoFetcher = async (
  url: string,
  token: string | null,
  eventId: string
) => {
  try {
    const response = await axios.post(
      url,
      { eventId: eventId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch check in with token and info");
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkInWithTokenAndNoInfoFetcher = async (
  url: string,
  token: string | null,
  eventId: string,
  quantity: number
) => {
  try {
    const response = await axios.post(
      url,
      { eventId: eventId, quantity: quantity },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch check in with token and no info");
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkInWithNoTokenAndInfoFetcher = async (
  url: string,
  token: string | null,
  eventId: string,
  anonymousInfo: anonymousCheckInInfoType
) => {
  try {
    const response = await axios.post(
      url,
      {
        eventId: eventId,
        firstName: anonymousInfo.firstName,
        lastName: anonymousInfo.lastName,
        faculty: anonymousInfo.faculty,
        phoneNumber: anonymousInfo.phoneNumber,
        studentId: anonymousInfo.studentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch check in with no token and info");
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkInWithNoTokenAndNoInfoFetcher = async (
  url: string,
  token: string | null,
  eventId: string,
  quantity: number
) => {
  try {
    const response = await axios.post(
      url,
      { eventId: eventId, quantity: quantity },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch check in with no token and no info");
    }
  } catch (error) {
    console.log(error);
  }
};
