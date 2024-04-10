import { Box, Button, CardMedia, TextField } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FACULTY } from "@/data/faculty";
import { eventDetailModel } from "@/model/eventModel/eventModel";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { GET_EVENT_DETAIL_NO_GUARD } from "@/fetcher/endpoint/eventEP/eventEP";
import { getEventDetailFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { anonymousCheckInInfoType } from "@/model/checkInModel/checkInModel";
import { CHECK_IN_WITH_NO_TOKEN_AND_INFO } from "@/fetcher/endpoint/checkInEP/checkInEP";
import { checkInWithNoTokenAndInfoFetcher } from "@/fetcher/api/checkInAPI/checkInAPI";

export default function InputInfo() {
  const router = useRouter();
  const { id: eventId } = router.query;
  const auth = useAuth();
  const [event, setEvent] = useState<eventDetailModel | null>(null);

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value as string);
  };

  const handleSubmit = async () => {
    // console.log("Submit");
    const createAnonymousInfo: anonymousCheckInInfoType = {
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      phoneNumber: phoneNumber ? phoneNumber : null,
      faculty: faculty ? faculty : null,
      studentId: studentId ? studentId : null,
    };
    // setAnonymousInfo(createAnonymousInfo);
    const checkInResponse = await checkInWithNoTokenAndInfoFetcher(
      CHECK_IN_WITH_NO_TOKEN_AND_INFO,
      auth.token,
      event && event?.eventId !== null ? event?.eventId : "",
      createAnonymousInfo
    );
    if (event !== null) {
      router.push({
        pathname: "./../comment/" + event.eventId,
        query: { anonymousId: checkInResponse.anonymousId },
      });
    }
    // console.log(checkInResponse.anonymousId);
  };

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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "fit-content",
        padding: "32px",
      }}
    >
      {event && (
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {" "}
          <CardMedia
            component="img"
            image={event.ImageURL !== null ? event.ImageURL : ""}
            alt={event.ImageName !== null ? event.ImageName : ""}
            sx={{ borderRadius: "10px", boxShadow: "0px 0px 4px grey" }}
          />
          <Box
            sx={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              id="firstName"
              label="ชื่อ"
              variant="outlined"
              fullWidth
              value={firstName ? firstName : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFirstName(event.target.value);
              }}
            />

            <TextField
              id="lastName"
              label="นามสกุล"
              variant="outlined"
              fullWidth
              value={lastName ? lastName : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setLastName(event.target.value);
              }}
            />

            <TextField
              id="phoneNumber"
              label="เบอร์โทร"
              variant="outlined"
              fullWidth
              value={phoneNumber ? phoneNumber : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPhoneNumber(event.target.value);
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="facultyName">คณะ</InputLabel>
              <Select
                labelId="facultySelect"
                id="facultySelect"
                value={faculty !== null ? faculty : "ไม่ระบุ"}
                label="faculty"
                onChange={handleChange}
              >
                {FACULTY.map((faculty, index) => {
                  return (
                    <MenuItem key={index} value={faculty.value}>
                      {faculty.F_NAME_TH}
                    </MenuItem>
                  );
                })}
                <MenuItem value={"ไม่ระบุ"}>ไม่ระบุ</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="studentId"
              label="รหัสนักศึกษา"
              variant="outlined"
              fullWidth
              value={studentId ? studentId : ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setStudentId(event.target.value);
              }}
            />

            <Button variant="contained" onClick={handleSubmit} fullWidth>
              เช็คอิน
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
