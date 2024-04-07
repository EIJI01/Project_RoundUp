import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Router, { useRouter } from "next/router";

const Login = () => {
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
        Welcome back
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField label="Enter your student ID" variant="outlined" fullWidth />
        <TextField
          label="Enter your password"
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
        onClick={() => {}}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
