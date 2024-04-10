import { useAuth } from "@/@core/provider/hooks/useAuth";
import { getEventDetailFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { eventDetailModel } from "@/model/eventModel/eventModel";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { GET_EVENT_DETAIL_NO_GUARD } from "@/fetcher/endpoint/eventEP/eventEP";
import { USER_COMMENT, ANONYMOUS_COMMENT } from "@/fetcher/endpoint/commentEP/commentEP";
import { userCommentFetcher, anonymousCommentFetcher } from "@/fetcher/api/commentAPI/commentAPI";

const Comment = () => {
  const router = useRouter();
  const { id: eventId, anonymousId } = router.query;
  const auth = useAuth();
  const [event, setEvent] = useState<eventDetailModel | null>(null);

  const [commentDetail, setCommentDetail] = useState<string>("");
  const [commentRatting, setCommentRatting] = useState<number>(5);

  // useEffect(() => {
  //   console.log(typeof anonymousId);
  // }, [anonymousId]);

  const handleSubmitComment = async () => {
    router.replace("/thank_you");
    if (anonymousId === undefined && auth.token !== null) {
      await userCommentFetcher(USER_COMMENT, auth.token, event && event?.eventId !== null ? event?.eventId : "", commentDetail, commentRatting);
    }
    if (typeof anonymousId === "string" && auth.token === null) {
      await anonymousCommentFetcher(
        ANONYMOUS_COMMENT,
        auth.token,
        event && event?.eventId !== null ? event?.eventId : "",
        anonymousId,
        commentDetail,
        commentRatting
      );
    }
  };

  const handleFetchEventDetail = async () => {
    const eventDetailData = await getEventDetailFetcher(GET_EVENT_DETAIL_NO_GUARD + `/${eventId}`, auth.token);
    // console.log(eventDetailData);

    const formattedEventDetail: eventDetailModel = {
      eventId: eventDetailData.eventId,
      ImageName: eventDetailData.ImageName,
      ImageURL: eventDetailData.ImageURL,
      eventName: eventDetailData.eventName,
      eventDetail: eventDetailData.eventDetail,
      eventLocation: eventDetailData.eventLocation,
      isLimited: eventDetailData.isLimited,
      quantity: eventDetailData.quantity,
      reserveId: eventDetailData.reserveId,
      numberOfReserve:
        typeof eventDetailData.reserveId !== "undefined" && eventDetailData.reserveId.length > 0 ? eventDetailData.reserveId.length : 0,
      startDate: eventDetailData.startDate,
      endDate: eventDetailData.endDate,
    };
    setEvent(formattedEventDetail);
    // console.log(formattedEventDetail);
  };

  useEffect(() => {
    if (eventId) {
      handleFetchEventDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <Box sx={{ height: "100dvh", padding: "32px" }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        ขอขอบคุณที่มาเข้าร่วมกิจกรรมของเรา
      </Typography>
      <Typography sx={{ marginTop: 3, color: "gray", marginBottom: 3 }}>
        ท่านสามารถคอมเมนต์ติชม เพื่อให้กำลังใจทีมงานผู้จัดทำ หรือแจ้งสิ่งแปลกๆที่พบเจอในงานได้
      </Typography>
      <form>
        <TextField
          id="commentDetail"
          label="กรุณากรอกคอมเมนต์ของคุณ"
          multiline
          rows={4}
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCommentDetail(event.target.value);
          }}
        />
        <Box sx={{ display: "flex", marginTop: 2, gap: 1 }}>
          <Typography sx={{ color: "gray", fontSize: "14px" }}>ให้คะแนนความพึงพอใจของคุณ</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.7,
                },
                ...(commentRatting === 1 && {
                  backgroundColor: "black",
                  color: "white",
                }),
              }}
              onClick={() => {
                setCommentRatting(1);
              }}
            >
              1
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.7,
                },
                ...(commentRatting === 2 && {
                  backgroundColor: "black",
                  color: "white",
                }),
              }}
              onClick={() => {
                setCommentRatting(2);
              }}
            >
              2
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.7,
                },
                ...(commentRatting === 3 && {
                  backgroundColor: "black",
                  color: "white",
                }),
              }}
              onClick={() => {
                setCommentRatting(3);
              }}
            >
              3
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.7,
                },
                ...(commentRatting === 4 && {
                  backgroundColor: "black",
                  color: "white",
                }),
              }}
              onClick={() => {
                setCommentRatting(4);
              }}
            >
              4
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.7,
                },
                ...(commentRatting === 5 && {
                  backgroundColor: "black",
                  color: "white",
                }),
              }}
              onClick={() => {
                setCommentRatting(5);
              }}
            >
              5
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 2,
            backgroundColor: "black",
            textTransform: "capitalize",
          }}
          size="medium"
          fullWidth
          onClick={handleSubmitComment}
        >
          ส่ง
        </Button>
      </form>
    </Box>
  );
};

export default Comment;
