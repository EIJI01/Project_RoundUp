import { Box, Typography } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function ThankYou() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100dvh",
      }}
    >
      <CheckIcon sx={{ fontSize: "96px" }}></CheckIcon>
      <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>THANK YOU</Typography>
    </Box>
  );
}
