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
import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { FACULTY } from "@/data/faculty";

const Register = () => {
  const [faculty, setFaculty] = React.useState<string | null>(null);

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
        <TextField label="First name" variant="outlined" fullWidth />
        <TextField label="Last name" variant="outlined" fullWidth />
        <TextField label="Telephone number" variant="outlined" fullWidth />
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
        <TextField label="Student ID" variant="outlined" fullWidth />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
        />
      </Box>
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
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
