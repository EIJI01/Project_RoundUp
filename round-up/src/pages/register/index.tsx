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

const Register = () => {
  const [faculty, setFaculty] = React.useState<string[]>([]);

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
    setFaculty(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
      <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>Register to get started</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField label="Enter your KKU ID" variant="outlined" fullWidth />
        <TextField label="Enter your password" variant="outlined" fullWidth />
        <TextField label="Enter your password" variant="outlined" fullWidth />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Faculty</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={faculty}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, faculty, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Enter your password" variant="outlined" fullWidth />
        <TextField label="Enter your password" variant="outlined" fullWidth type="password" />
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
