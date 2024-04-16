import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LogoURL from "../../../public/assets/RemindU_LOGO.png";
import { useRouter } from "next/router";

export default function ThankYou() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "fit-content",
        padding: "32px",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${LogoURL.src})`,
            width: "80px",
            height: "50px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            marginRight: "100px",
          }}
        ></Box>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "500",
            position: "absolute",
            right: 135,
          }}
        >
          emind U
        </Typography>
      </Box>

      <Box sx={{ width: "100%", height: "fit-content" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>Remind You คืออะไร?</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เป็นเว็ปแอพพลิเคชันที่ถูกสร้างมาเพื่อช่วยกระจายข่าวสาร และการจัดกิจกรรม
          โดยผู้ใช้งานจะสามารถฟิลเตอร์หาเฉพาะ ประเภทกิจกรรมที่ตนสนใจได้
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "fit-content" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>Remind You มีประโยชน์อย่างไร?</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตัวเว็ปถูกสร้างมาเพื่อแก้ปัญหาข่าวสารของอีเวนท์ที่มีการ ประกาศหลายที่มากๆ ซึ่งในหลายๆครั้ง
          ข่าวสารไปไม่ถึงผู้ที่ต้อง การอย่างทันเวลา รวมไปถึงการนับจำนวนผู้เข้าร่วมอีเวนท์ ที่เร็วๆนี้
          ทางผู้จัดทำยังพบเห็นวิธีการนับคนเข้างานด้วยสติ๊กเกอร์กันอยู่ เราจึงจัดทำเว็ปแอพพลิเคชันนี้ขึ้นมาเพื่อจัดการกับปัญหาเหล่าน
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "fit-content" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>Remind You ใช้งานอย่างไร?</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หลังจากสร้างบัญชีผู้ใช้แล้วเข้าสู่ระบบ ในหน้าแรกจะมีอีเวนท์
          ทั้งหมดของทั้งมหาวิทยาลัยที่กำลังจะจัด โดยสามารถใส่ฟิลเตอร์ ดูเฉพาะกิจกรรมในบางคณะ หรือบางประเภทที่สนใจได้ ในกิจกรรมที่มีการจำกัดจำนวนคน
          แค่เพียงผู้ใช้งานกดจองที่ เจ้าหน้าที่ของ กิจกรรมก็จะติดต่อกลับไปยืนยันกับเราได้เลย โดยไม่ต้องกรอกข้อมูลอะไรเพิ่มเติม
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "fit-content" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>นอกจากเรื่องข่าวสารแล้ว มีประโยชน์อะไรอีกไหม?</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;นอกจากฝั่งของผู้เข้าร่วมกิจกรรมแล้ว จุดประสงค์หลัก
          อีกอย่างของเว็ปแอพลิเคชันนี้คือช่วยเหลือผู้จัดกิจกรรม &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เมื่อผู้จัดกิจกรรมทำการเพิ่มกิจกรรม
          ทางผู้จัดจะมองเห็น รายละเอียด ช่องทางการติดต่อ ของผู้ที่ต้องการจะเข้าร่วมทุกคน และนอกจากนั้น เมื่อผู้คนมาเข้างาน ข้อมูลของผู้เข้าร่วมงานจริง
          ก็จะถูกแสดงให้ผู้จัดงานทราบด้วยเช่นกัน
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "fit-content" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>จะเริ่มต้นใช้งานได้อย่างไร?</Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginTop: "5px",
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถคลิกที่ปุ่มด้านล่าง เพื่อเริ่มทดลองใช้งานได้เลย
        </Typography>
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
          router.push("/");
        }}
      >
        เริ่มต้นใช้งาน
      </Button>
    </Box>
  );
}
