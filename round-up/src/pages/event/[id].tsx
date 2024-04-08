import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { EVENTS, EventType } from "@/data/mock";
import { useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function EventId() {
  const router = useRouter();
  const [filterData, setFilterData] = useState<EventType>();

  useEffect(() => {
    const filteredEvent = EVENTS.find((event) => event.id === router.query.id);
    setFilterData(filteredEvent);
  }, [router.query.id]);

  return (
    <Box sx={{ height: "100vh", padding: "24px", width: "100%" }}>
      {filterData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Image
              src={filterData?.image as string}
              alt={filterData.ImageName}
              width={400}
              height={500}
              layout="responsive"
              style={{ borderRadius: "10px" }}
            />
            <Typography
              sx={{ fontSize: "32px", fontWeight: "bold", marginTop: "16px" }}
            >
              {filterData.title}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "8px" }}>
              {filterData.detail}
            </Typography>
          </Box>

          <Box
            sx={{
              gap: "15px",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <AccessTimeIcon sx={{ fontSize: "32px" }}></AccessTimeIcon>
              <Typography> {filterData.startDate}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LocationOnIcon sx={{ fontSize: "32px" }}></LocationOnIcon>
              <Typography> {filterData.location}</Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ color: "grey" }}>0 / 30</Typography>
        <Button variant="contained">จองที่</Button>
      </Box>
    </Box>
  );
}
