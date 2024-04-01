import { Box, Button } from "@mui/material";
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
    <Box sx={{ height: "100dvh", padding: "32px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ marginTop: "32px" }}>
          {filterData && (
            <>
              <Image
                src={filterData.image}
                alt={filterData.ImageName}
                width={400}
                height={500}
                style={{ borderRadius: "16px" }}
              />
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    {/*@ts-ignore*/}
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Item One" value="1" />
                      <Tab label="Item Two" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" color="secondary">
                    <button style={{ backgroundColor: "red" }}>check in</button>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box></Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckIn;
