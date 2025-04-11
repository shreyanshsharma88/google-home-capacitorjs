import {
  Close,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FlaskConical } from "lucide-react";
import { useState } from "react";
import { IProfile } from "../Hooks";

export const Navbar = ({
  handleProfileIconClick,
  defaultProfile,
}: {
  handleProfileIconClick: () => void;
  defaultProfile: IProfile;
}) => {
  const theme = useTheme();
  console.log({ defaultProfile });

  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <FlaskConical
        color={theme.palette.primary.main}
        style={{ width: "30px", height: "30px" }}
      />

      <Box
        component="img"
        sx={{
          borderRadius: "100%",
          cursor: "pointer",
          width: "50px",
          height: "50px",
        }}
        onClick={handleProfileIconClick}
        src={defaultProfile.image}
      />
    </Stack>
  );
};
