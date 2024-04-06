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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EVENTS } from "@/data/mock";
import { FACULTY } from "@/data/faculty";
import { CATEGORY } from "@/data/category";

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
  const [expanded, setExpanded] = React.useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {}, [filterFaculty]);
  useEffect(() => {}, [filterCategory]);

  return (
    <Box sx={{ height: "100dvh", width: "100%", padding: "32px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <Typography
          sx={{ fontSize: "32px", fontWeight: "bold", width: "100%" }}
        >
          PhakPhoom
        </Typography>
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
            {/* <MenuItem value={"AG"}>
              <Checkbox checked={filterFaculty.indexOf("AG") > -1} />
              <ListItemText primary={"AG"} />
            </MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}

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
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}

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

      <Box sx={{}}>
        {EVENTS.map((data, index) => {
          return (
            <Card
              key={index}
              sx={{
                maxWidth: "100%",
                marginBottom: "24px",
                ":hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={() => (window.location.href = `feed/${data.id}`)}
            >
              <CardMedia
                component="img"
                height="300"
                image={data.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.title}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>{data.detail}</CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RoundUpFeed;
