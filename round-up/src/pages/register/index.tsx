import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { FACULTY } from "@/data/faculty";
import { useRouter } from "next/router";
import { registerFetcher } from "@/fetcher/api/authenticationAPI/authenticationAPI";
import { REGISTER_ENDPOINT } from "@/fetcher/endpoint/authenticationEP/authenticationEP";
import { registerValueType } from "@/model/authenticationModel/authenticationModel";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [studentID, setStudentID] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const theme = useTheme();
  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event: SelectChangeEvent<typeof faculty>) => {
    const {
      target: { value },
    } = event;
    setFaculty(value);
  };

  const handleSubmitRegister = async () => {
    const registerValue: registerValueType = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      faculty: faculty,
      studentID: studentID,
      password: password,
    };
    const responseMessage = await registerFetcher(
      REGISTER_ENDPOINT,
      registerValue
    );
    if (responseMessage) {
      router.push(".");
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "64px",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>
        Register to get started
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFirstName(event.target.value);
          }}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLastName(event.target.value);
          }}
        />
        <TextField
          label="Telephone number"
          variant="outlined"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(event.target.value);
          }}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Faculty</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={faculty !== null ? faculty : "ไม่ระบุ"}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {FACULTY.map((faculty, index) => (
              <MenuItem
                key={index}
                value={faculty.F_NAME_TH}
                // style={getStyles(name, faculty, theme)}
              >
                {faculty.F_NAME_TH}
              </MenuItem>
            ))}
            <MenuItem value={"ไม่ระบุ"}>ไม่ระบุ</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Student ID"
          variant="outlined"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setStudentID(event.target.value);
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "24px",
          flexDirection: "column",
        }}
      >
        {" "}
        <Button
          variant="contained"
          disableElevation
          fullWidth
          size="large"
          sx={{
            color: "white",
            backgroundColor: "black",
            borderRadius: "8px",
            textTransform: "capitalize",
            paddingY: "16px",
          }}
          onClick={handleSubmitRegister}
        >
          Register
        </Button>
        <Button
          disableElevation
          fullWidth
          sx={{
            color: "black",
            backgroundColor: "white",
            textTransform: "capitalize",
          }}
          onClick={() => {
            router.push(".");
          }}
        >
          Back To Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
