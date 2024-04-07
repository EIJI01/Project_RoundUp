import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { EVENTS } from "@/data/mock";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const CheckIn = () => {
  const router = useRouter();
  const filterData = EVENTS.filter((data) => data.id === router.query.id)[0];
  const [value, setValue] = React.useState("1");

  function handleChange(event: React.SyntheticEvent, newValue: string) {
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <Box sx={{ height: "100dvh", padding: "32px", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{}}>
          {filterData && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Image
                src={filterData.image}
                alt={filterData.ImageName}
                width={400}
                height={500}
                layout="responsive"
                style={{ borderRadius: "10px", marginTop: "10px" }}
              />
              <Button variant="contained" fullWidth sx={{ marginTop: "10px" }}>
                check in
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckIn;
