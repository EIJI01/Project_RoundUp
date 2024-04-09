import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EVENTS } from "@/data/mock";
import { FACULTY } from "@/data/faculty";
import { CATEGORY } from "@/data/category";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { GET_LIST_EVENT } from "@/fetcher/endpoint/eventEP/eventEP";
import { getListEventFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { eventModel } from "@/model/eventModel/eventModel";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RoundUpFeed = () => {
  const router = useRouter();

  const auth = useAuth();

  const [listEvent, setListEvent] = React.useState<eventModel[] | null>(null);

  const [expanded, setExpanded] = React.useState<number | null>(null);
  const [value, setValue] = React.useState<string>("");
  const [filterFaculty, setFilterFaculty] = React.useState<string[]>([]);
  const [filterCategory, setFilterCategory] = React.useState<string[]>([]);
  const [filterFacultyValue, setFilterFacultyValue] = React.useState<string[]>(
    []
  );
  const [filterCategoryValue, setFilterCategoryValue] = React.useState<
    string[]
  >([]);

  const handleChangeFilterFaculty = (
    event: SelectChangeEvent<typeof filterFaculty>
  ) => {
    const {
      target: { value },
    } = event;
    setFilterFaculty(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeFilterCategory = (
    event: SelectChangeEvent<typeof filterFaculty>
  ) => {
    const {
      target: { value },
    } = event;
    setFilterCategory(typeof value === "string" ? value.split(",") : value);
  };

  const handleExpandClick = (index: number | null) => {
    setExpanded(index);
  };

  const fetchListEvent = async () => {
    const eventData = await getListEventFetcher(GET_LIST_EVENT, auth.token);
    console.log(eventData);

    if (eventData.length > 0) {
      const formattedEventData: eventModel[] = eventData.map(
        (event: eventModel) => {
          return {
            ImageName: event.ImageName,
            ImageURL: event.ImageURL,
            eventName: event.eventName,
            eventDetail: event.eventDetail,
          };
        }
      );
      setListEvent(formattedEventData);
    }
  };

  useEffect(() => {
    fetchListEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {}, [filterFaculty]);
  // useEffect(() => {}, [filterCategory]);

  return (
    <Box sx={{ height: "fit-content", width: "100%", padding: "32px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            width: "75%",
            overflow: "hidden",
          }}
        >
          {auth.user?.firstName} {auth.user?.lastName}
        </Typography>
        <Box
          sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
          onClick={() => {
            auth.logout();
          }}
        >
          <Typography>Logout</Typography>
          <LogoutIcon></LogoutIcon>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="filterFacultyLabel">filter faculty</InputLabel>
          <Select
            labelId="filterFaculty"
            id="filterFaculty"
            value={filterFaculty}
            label="filterFaculty"
            onChange={handleChangeFilterFaculty}
            multiple
            renderValue={(selected) => selected.join(", ")}
          >
            {FACULTY.map((faculty, index) => {
              return (
                <MenuItem key={index} value={faculty.F_NAME_TH}>
                  <Checkbox
                    checked={filterFaculty.indexOf(faculty.F_NAME_TH) > -1}
                  />
                  <ListItemText primary={faculty.F_NAME_TH} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="filterCategoryLabel">filter category</InputLabel>
          <Select
            labelId="filterCategory"
            id="filterCategory"
            value={filterCategory}
            label="filterCategory"
            onChange={handleChangeFilterCategory}
            multiple
            renderValue={(selected) => selected.join(", ")}
          >
            {CATEGORY.map((category, index) => {
              return (
                <MenuItem key={index} value={category.C_NAME_TH}>
                  <Checkbox
                    checked={filterCategory.indexOf(category.C_NAME_TH) > -1}
                  />
                  <ListItemText primary={category.C_NAME_TH} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {(listEvent && listEvent?.length > 0
        ? (listEvent as eventModel[])
        : []
      ).map((data, index) => {
        return (
          <Card
            key={index}
            sx={{
              marginBottom: "24px",
              height: "fit-content",
              borderRadius: "10px",
              width: "100%",
              paddingBottom: "10px",
              boxShadow: "0px 0px 4px grey",
            }}
          >
            <CardMedia
              component="img"
              image={data.ImageURL !== null ? data.ImageURL : ""}
              alt="Paella dish"
              onClick={() => {}}
              sx={{ cursor: "pointer", height: "80%" }}
            />

            <Box
              sx={{
                width: "100%",
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  height: "40px",
                  paddingX: "15px",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {data.eventName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  0 / 30
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-start",
                  height: "fit-content",
                }}
              >
                <Collapse
                  in={expanded === index}
                  collapsedSize={35}
                  sx={{ width: "90%" }}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      paddingX: "15px",
                    }}
                  >
                    {data.eventDetail}
                  </CardContent>
                </Collapse>
                <CardActions
                  disableSpacing
                  sx={{
                    alignSelf: "flex-start",
                    width: "10%",
                    height: 30,
                  }}
                >
                  <ExpandMore
                    expand={expanded === index}
                    onClick={() => {
                      if (expanded == index) {
                        handleExpandClick(null);
                      } else {
                        handleExpandClick(index);
                      }
                    }}
                    aria-expanded={!!expanded && expanded === index}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default RoundUpFeed;
