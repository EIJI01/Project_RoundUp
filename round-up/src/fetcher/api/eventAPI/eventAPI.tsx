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

export const getEventDetailFetcher = async (
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
      throw new Error("Failed to fetch event detail");
    }
  } catch (error) {
    console.log(error);
  }
};

export const eventReservationFetcher = async (
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
      return response.data.message;
    } else {
      throw new Error("Failed to fetch event reservation");
    }
  } catch (error) {
    console.log(error);
  }
};
