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
import { FACULTY } from "@/data/faculty";
import { CATEGORY } from "@/data/category";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "@/@core/provider/hooks/useAuth";
import { GET_LIST_EVENT } from "@/fetcher/endpoint/eventEP/eventEP";
import { getListEventFetcher } from "@/fetcher/api/eventAPI/eventAPI";
import { listEventModel } from "@/model/eventModel/eventModel";
import moment from "moment";

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

  const [defaultListEvent, setDefaultListEvent] = React.useState<
    listEventModel[] | null
  >(null);

  const [listEvent, setListEvent] = React.useState<listEventModel[] | null>(
    null
  );

  const [listFilterFacultyEvent, setListFilterFacultyEvent] = React.useState<
    listEventModel[]
  >([]);

  const [listFilterCategoryEvent, setListFilterCategoryEvent] = React.useState<
    listEventModel[]
  >([]);

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

    if (eventData.length > 0) {
      const formattedEventData: listEventModel[] = eventData.map(
        (event: listEventModel) => {
          return {
            ImageName: event.ImageName,
            ImageURL: event.ImageURL,
            eventName: event.eventName,
            eventDetail: event.eventDetail,
            isLimited: event.isLimited,
            quantity: event.quantity,
            numberOfReserve:
              typeof event.reserveId !== "undefined"
                ? event.reserveId?.length
                : 0,
            faculty: event.faculty,
            category: event.category,
            startDate: event.startDate,
            endDate: event.endDate,
          };
        }
      );

      const filterDateEventData = formattedEventData.filter((event) => {
        const endDate = event.endDate && new Date(event.endDate);
        const startDate = event.startDate && new Date(event.startDate);
        const currentDate = new Date();

        if (endDate && startDate) {
          return endDate > currentDate && startDate > currentDate;
        }
      });
      // console.log(formattedEventData);
      setListEvent(filterDateEventData);
      setDefaultListEvent(filterDateEventData);
    }
  };

  useEffect(() => {
    fetchListEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterFaculty.length > 0) {
      const filterFacultyValue = FACULTY.filter((faculty) => {
        return filterFaculty.includes(faculty.F_NAME_TH);
      }).map((faculty) => {
        return faculty.value;
      });

      if (defaultListEvent && listEvent && listEvent.length > 0) {
        const filterListEvent = defaultListEvent.filter((event) => {
          return event.faculty?.some((faculty) =>
            filterFacultyValue.includes(faculty)
          );
        });
        // console.log(filterListEvent);
        setListFilterFacultyEvent(filterListEvent);
      }

      // console.log(filterFacultyValue);
    } else {
      setListFilterFacultyEvent([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterFaculty]);

  useEffect(() => {
    if (filterCategory.length > 0) {
      const filterCategoryValue = CATEGORY.filter((category) => {
        return filterCategory.includes(category.C_NAME_TH);
      }).map((category) => {
        return category.value;
      });

      if (defaultListEvent && listEvent && listEvent.length > 0) {
        const filterListEvent = defaultListEvent.filter((event) => {
          return event.category?.some((category) =>
            filterCategoryValue.includes(category)
          );
        });
        // console.log(filterListEvent);
        setListFilterCategoryEvent(filterListEvent);
      }

      // console.log(filterCategoryValue);
    } else {
      setListFilterCategoryEvent([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory]);

  useEffect(() => {
    if (defaultListEvent && defaultListEvent?.length > 0) {
      defaultListEvent?.map((event) => {
        const currentDate = new Date();
        const startDate = event.startDate && new Date(event.startDate);
        // console.log(moment(currentDate).format("HH:mm"));
        // console.log(startDate);
        if (
          startDate &&
          currentDate.getTime() < startDate.getTime() &&
          currentDate.getDate() === startDate.getDate() &&
          currentDate.getMonth() === startDate.getMonth() &&
          currentDate.getFullYear() === startDate.getFullYear()
        ) {
          alert(
            "วันนี้อีเว้นท์ " +
              event.eventName +
              " ที่คุณได้จองไว้จะเริ่มต้นขึ้นเมื่อ " +
              moment(startDate).format("HH:mm") +
              " น."
          );
        }
      });
    }
  }, [defaultListEvent]);

  useEffect(() => {
    if (
      listFilterFacultyEvent.length > 0 ||
      listFilterCategoryEvent.length > 0
    ) {
      const finalFilterEvent = new Set([
        ...listFilterFacultyEvent,
        ...listFilterCategoryEvent,
      ]);
      // console.log(finalFilterEvent);
      setListEvent(Array.from(finalFilterEvent));
    } else {
      setListEvent(defaultListEvent);
    }

    // setListEvent(...finalFilterEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listFilterFacultyEvent, listFilterCategoryEvent]);

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
        ? (listEvent as listEventModel[])
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
                {data.isLimited === true ? (
                  <Typography variant="body2" color="text.secondary">
                    {data.numberOfReserve} / {data.quantity}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Unlimited
                  </Typography>
                )}
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
