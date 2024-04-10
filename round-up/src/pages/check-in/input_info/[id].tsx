import { Box, Button, CardMedia, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { EVENTS, EventType } from "@/data/mock";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FACULTY } from "@/data/faculty";
import { eventDetailModel } from "@/model/eventModel/eventModel";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { GET_EVENT_DETAIL_NO_GUARD } from "@/fetcher/endpoint/eventEP/eventEP";
import { getEventDetailFetcher } from "@/fetcher/api/eventAPI/eventAPI";

interface InfoModel {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studentId: string | null;
}

export default function InputInfo() {
  const router = useRouter();
  const { id: eventId } = router.query;
  const auth = useAuth();
  const [event, setEvent] = useState<eventDetailModel | null>(null);

  const [filterData, setFilterData] = useState<EventType>();

  const [anonymousInfo, setAnonymousInfo] = useState<InfoModel | null>(null);

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const filteredEvent = EVENTS.find((event) => event.id === router.query.id);
    setFilterData(filteredEvent);
  }, [router.query.id]);

  const handleChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value as string);
  };

  const handleSubmit = () => {
    console.log("Submit");
    const createAnonymousInfo: InfoModel = {
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      phoneNumber: phoneNumber ? phoneNumber : null,
      faculty: faculty ? faculty : null,
      studentId: studentId ? studentId : null,
    };
    setAnonymousInfo(createAnonymousInfo);
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
        paddingX: "30px",
        paddingY: "20px",
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
            />

            <TextField
              id="lastName"
              label="นามสกุล"
              variant="outlined"
              fullWidth
              value={lastName ? lastName : ""}
            />

            <TextField
              id="phoneNumber"
              label="เบอร์โทร"
              variant="outlined"
              fullWidth
              value={phoneNumber ? phoneNumber : ""}
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
                    <MenuItem key={index} value={faculty.F_NAME_TH}>
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
            />

            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
