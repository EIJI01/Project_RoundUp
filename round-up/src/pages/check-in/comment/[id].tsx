import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Comment = () => {
  const router = useRouter();
  return (
    <Box sx={{ height: "100dvh", padding: "32px" }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        ขอขอบคุณที่มาเข้าร่วมกิจกรรมของเรา
      </Typography>
      <Typography sx={{ marginTop: 3, color: "gray", marginBottom: 3 }}>
        ท่านสามารถคอมเมนต์ติชม เพื่อให้กำลังใจทีมงานผู้จัดทำ หรือแจ้งสิ่งแปลกๆที่พบเจอในงานได้
      </Typography>
      <form>
        <TextField
          id="outlined-multiline-static"
          label="คอมเมนต์ของคุณ"
          multiline
          rows={4}
          fullWidth
        />
        <Box sx={{ display: "flex", marginTop: 2, gap: 1 }}>
          <Typography sx={{ color: "gray", fontSize: "14px" }}>
            ให้คะแนนความพึงพอใจของคุณ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": { backgroundColor: "black", color: "white" },
              }}
            >
              1
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": { backgroundColor: "black", color: "white" },
              }}
            >
              2
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": { backgroundColor: "black", color: "white" },
              }}
            >
              3
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": { backgroundColor: "black", color: "white" },
              }}
            >
              4
            </Box>
            <Box
              sx={{
                paddingY: 1,
                paddingX: 2,
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": { backgroundColor: "black", color: "white" },
              }}
            >
              5
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, backgroundColor: "black", textTransform: "capitalize" }}
          size="medium"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Comment;
