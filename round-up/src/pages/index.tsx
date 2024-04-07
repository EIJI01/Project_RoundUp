import styles from "@/styles/Home.module.css";
import { Box, Button, Typography } from "@mui/material";
import Background from "../../public/assets/background.jpg";
import Image from "next/image";
import Logo from "../../public/assets/logo.jpg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100dvh",
        backgroundImage: `url(${Background.src})`,
        width: "100%",
        backgroundPosition: "35% 50%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          bgcolor: "#5882c144",
          height: "49.5dvh",
          width: "100%",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "10%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
              gap: "4px",
            }}
          >
            <Image
              src={Logo}
              alt="kuy"
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <Typography sx={{ fontWeight: "bold" }}>KKURoundUp</Typography>
          </Box>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            size="large"
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "4px",
              textTransform: "capitalize",
              paddingY: "12px",
            }}
            onClick={() => {
              router.push("login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            sx={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "4px",
              textTransform: "capitalize",
              paddingY: "12px",
            }}
            onClick={() => {
              router.push("register");
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
