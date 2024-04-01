import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { EVENTS, EventType } from "@/data/mock";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface InfoModel {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  faculty: string | null;
  studentId: string | null;
}

export default function InputInfo() {
  const router = useRouter();
  const [filterData, setFilterData] = useState<EventType>();

  const [anonymousInfo, setAnonymousInfo] = useState<InfoModel | null>(null);

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string>("Faculty 1");
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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "fit-content",
        paddingX: "30px",
        paddingY: "20px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Image
        src={filterData?.image as string}
        alt={filterData ? filterData.ImageName : ""}
        width={400}
        height={500}
        style={{ borderRadius: "10px" }}
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
          value={firstName}
        />

        <TextField
          id="lastName"
          label="นามสกุล"
          variant="outlined"
          fullWidth
          value={lastName}
        />

        <TextField
          id="phoneNumber"
          label="เบอร์โทร"
          variant="outlined"
          fullWidth
          value={phoneNumber}
        />

        <FormControl fullWidth>
          <InputLabel id="facultyName">คณะ</InputLabel>
          <Select
            labelId="facultySelect"
            id="facultySelect"
            value={faculty}
            label="faculty"
            onChange={handleChange}
          >
            <MenuItem value={"Faculty 1"}>Faculty 1</MenuItem>
            <MenuItem value={"Faculty 2"}>Faculty 2</MenuItem>
            <MenuItem value={"Faculty 3"}>Faculty 3</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="studentId"
          label="รหัสนักศึกษา"
          variant="outlined"
          fullWidth
          value={studentId}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}