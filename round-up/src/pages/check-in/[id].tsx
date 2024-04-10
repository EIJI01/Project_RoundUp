import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { eventDetailModel } from "@/model/eventModel/eventModel";
import { getEventDetailFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { GET_EVENT_DETAIL_NO_GUARD } from "@/fetcher/endpoint/eventEP/eventEP";

const CheckIn = () => {
  const router = useRouter();
  const { id: eventId } = router.query;
  const auth = useAuth();
  const [event, setEvent] = useState<eventDetailModel | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleFetchEventDetail = async () => {
    const eventDetailData = await getEventDetailFetcher(
      GET_EVENT_DETAIL_NO_GUARD + `/${eventId}`,
      auth.token
    );
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
        typeof eventDetailData.reserveId !== "undefined" &&
        eventDetailData.reserveId.length > 0
          ? eventDetailData.reserveId.length
          : 0,
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

  // useEffect(() => {
  //   if (auth.token !== null) {
  //     console.log("have token");
  //   } else {
  //     console.log("no token");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.token]);

  return (
    <Box sx={{ height: "fit-content", padding: "32px", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {event && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "20px",
            }}
          >
            <CardMedia
              component="img"
              image={event.ImageURL !== null ? event.ImageURL : ""}
              alt={event.ImageName !== null ? event.ImageName : ""}
              sx={{ borderRadius: "10px", boxShadow: "0px 0px 4px grey" }}
            />
            {event.isLimited === false && auth.token === null && (
              <TextField
                label="กรุณากรอกจำนวนคนที่เข้ารวม"
                variant="outlined"
                fullWidth
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setQuantity(parseInt(event.target.value));
                }}
              />
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                if (auth.token !== null) {
                  if (event.isLimited === true) {
                    console.log("fetch check in with token and info");
                  } else {
                    console.log("fetch check in with token and no info");
                  }
                } else {
                  if (event.isLimited === true) {
                    console.log("fetch check in with anonymous and info");
                    router.push("./input_info/" + event.eventId);
                  } else {
                    console.log("fetch check in with anonymous and no info");
                  }
                }
              }}
            >
              check in
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CheckIn;
