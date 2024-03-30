import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { EVENTS, EventType } from "@/data/mock";
import { useState, useEffect } from "react";

export default function EventId() {
  const router = useRouter();
  const [filterData, setFilterData] = useState<EventType>();

  useEffect(() => {
    const filteredEvent = EVENTS.find((event) => event.id === router.query.id);
    setFilterData(filteredEvent);
  }, [router.query.id]);

  return (
    <Box sx={{ height: "100vh", padding: "32px" }}>
      {filterData && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          <Box>
            <Image
              src={filterData?.image as string}
              alt={filterData.ImageName}
              width={400}
              height={300}
            />
            <Box sx={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>
              {filterData.title}
            </Box>
            <Box sx={{ fontSize: "16px", marginTop: "16px" }}>{filterData.detail}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
