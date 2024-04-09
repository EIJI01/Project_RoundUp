import axios from "axios";

export const getListEventFetcher = async (
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
      throw new Error("Failed to fetch list event");
    }
  } catch (error) {
    console.log(error);
  }
};
