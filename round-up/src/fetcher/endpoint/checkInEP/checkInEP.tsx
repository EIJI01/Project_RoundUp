export const CHECK_IN_WITH_TOKEN_AND_INFO =
  process.env.NEXT_PUBLIC_ENDPOINT + "/check-in/user";

export const CHECK_IN_WITH_TOKEN_AND_NO_INFO =
  process.env.NEXT_PUBLIC_ENDPOINT + "/check-in/multiUser";

export const CHECK_IN_WITH_NO_TOKEN_AND_INFO =
  process.env.NEXT_PUBLIC_ENDPOINT + "/check-in/anonymous";

export const CHECK_IN_WITH_NO_TOKEN_AND_NO_INFO =
  process.env.NEXT_PUBLIC_ENDPOINT + "/check-in/multiAnonymous";
