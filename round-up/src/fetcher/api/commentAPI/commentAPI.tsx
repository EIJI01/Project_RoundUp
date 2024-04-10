import axios from "axios";

export const userCommentFetcher = async (
  url: string,
  token: string | null,
  eventId: string,
  commentDetail: string,
  commentRatting: number
) => {
  try {
    const response = await axios.post(
      url,
      {
        eventId: eventId,
        commentDetail: commentDetail,
        ratting: commentRatting,
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
      throw new Error("Failed to fetch user comment");
    }
  } catch (error) {
    console.log(error);
  }
};

export const anonymousCommentFetcher = async (
  url: string,
  token: string | null,
  eventId: string,
  anonymousId: string,
  commentDetail: string,
  commentRatting: number
) => {
  try {
    const response = await axios.post(
      url,
      {
        eventId: eventId,
        anonymousId: anonymousId,
        commentDetail: commentDetail,
        ratting: commentRatting,
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
      throw new Error("Failed to fetch anonymous comment");
    }
  } catch (error) {
    console.log(error);
  }
};
