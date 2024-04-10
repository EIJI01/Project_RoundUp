import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { eventDetailModel } from "@/model/eventModel/eventModel";
import { GET_EVENT_DETAIL, EVENT_RESERVATION } from "@/fetcher/endpoint/eventEP/eventEP";
import { getEventDetailFetcher, eventReservationFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import moment from "moment";

export default function EventId() {
  const router = useRouter();
  const { id: eventId } = router.query;
  const auth = useAuth();
  const [event, setEvent] = useState<eventDetailModel | null>(null);
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const formattedTimeEvent = (timeDate: string | null) => {
    const TimeDate: Date = new Date(timeDate ? timeDate : "");
    const formattedTime = moment(TimeDate).format("HH:mm");
    return <Typography>{formattedTime} น.</Typography>;
  };

  const handleFetchEventDetail = async () => {
    const eventDetailData = await getEventDetailFetcher(GET_EVENT_DETAIL + `/${eventId}`, auth.token);
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
    setIsReserved(eventDetailData.isReserved);
    if (formattedEventDetail.reserveId) {
      setIsAvailable(eventDetailData.reserveId.length < parseInt(eventDetailData.quantity));
    }
    // console.log(formattedEventDetail);
  };

  const handleReserve = async () => {
    await eventReservationFetcher(EVENT_RESERVATION, auth.token, event && event?.eventId !== null ? event?.eventId : "");
  };

  useEffect(() => {
    if (eventId && auth.token) {
      handleFetchEventDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, auth.token]);

  return (
    <Box sx={{ height: "fit-content", padding: "24px", width: "100%" }}>
      {event && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <CardMedia
              component="img"
              image={event.ImageURL !== null ? event.ImageURL : ""}
              alt={event.ImageName !== null ? event.ImageName : ""}
              sx={{ borderRadius: "10px", boxShadow: "0px 0px 4px grey" }}
            />
            <Typography sx={{ fontSize: "32px", fontWeight: "bold", marginTop: "16px" }}>{event.eventName}</Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "8px" }}>{event.eventDetail}</Typography>
          </Box>

          <Box
            sx={{
              gap: "15px",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <AccessTimeIcon sx={{ fontSize: "32px" }}></AccessTimeIcon>
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {formattedTimeEvent(event?.startDate)} - {formattedTimeEvent(event?.endDate)}
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LocationOnIcon sx={{ fontSize: "32px" }}></LocationOnIcon>
              <Typography> {event.eventLocation}</Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {event?.isLimited === true ? (
          <Typography sx={{ color: "grey" }}>
            {event?.numberOfReserve} / {event?.quantity}
          </Typography>
        ) : (
          <Typography sx={{ color: "grey" }}>Unlimited</Typography>
        )}

        {event?.isLimited === true && (
          <Button
            variant="contained"
            disabled={isReserved === true || isAvailable === false}
            onClick={() => {
              handleReserve();
              setIsReserved(true);
            }}
          >
            {isAvailable === true ? (isReserved === true ? "จองที่แล้ว" : "จองที่") : isReserved === true ? "จองที่แล้ว" : "จำนวนที่เต็มแล้ว"}
          </Button>
        )}

        <Button
          variant="text"
          onClick={() => {
            router.push(".");
          }}
        >
          กลับไปหน้ารายการอีเว้นท์
        </Button>
      </Box>
    </Box>
  );
}
