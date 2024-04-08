import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { LOGIN_ENDPOINT } from "../../fetcher/endpoint/authentication";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { loginValueType } from "@/model/context/authentication/authentication";

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSubmitLogin = async () => {
    const loginValue: loginValueType = { email: email, password: password };
    auth.login(LOGIN_ENDPOINT, loginValue);
  };

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
        <TextField
          label="Enter your student ID"
          variant="outlined"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          label="Enter your password"
          variant="outlined"
          fullWidth
          type="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
          onClick={handleSubmitLogin}
        >
          Login
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

export default Login;
