import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Camera,
  GraduationCap,
  Image,
  Languages,
  Mic,
  Music,
  Search,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { UseProfiles } from "../Hooks";
import { CameraSearchModal, SearchModal, UserProfilesMenu } from "./Modals";
import { Navbar } from "./Navbar";

export const GoogleContainer = () => {
  const { defaultProfile, useProfiles } = UseProfiles();
  const [sp, ssp] = useSearchParams();
  const params = new URLSearchParams(sp);
  const handleOpen = (key: string) => {
    params.set(key, "true");
    ssp(params);
  };
  const handleClose = (key: string) => {
    params.delete(key);
    ssp(params);
  };

  const actionIcons = [
    {
      icon: <Image color="#ffd04f" size={24} />,
      color: "#675e41",
    },
    {
      icon: <Languages color="#89b3f8" size={24} />,
      color: "#314152",
    },
    {
      icon: <GraduationCap color="#81c995" size={24} />,
      color: "#334438",
    },
    {
      icon: <Music color="#f28b82" size={24} />,
      color: "#5c3f43",
    },
  ];
  return (
    <Stack direction="column" gap={3} p={3}>
      <Navbar
        handleProfileIconClick={() => handleOpen("profiles")}
        defaultProfile={defaultProfile}
      />
      <Typography fontWeight={800} textAlign="center" fontSize="40px">
        Google
      </Typography>

      <TextField
        placeholder="Search"
        fullWidth
        variant="outlined"
        onClick={() => handleOpen("search")}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 28,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            "& fieldset": {
              borderColor: "transparent",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search style={{ color: "#9aa0a6" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment sx={{ gap: 2 }} position="end">
              <IconButton
                edge="end"
                aria-label="voice search"
                sx={{ color: "#8ab4f8" }}
              >
                <Mic />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="camera search"
                sx={{ color: "#9aa0a6" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen("cameraSearch");
                }}
              >
                <Camera />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Stack direction="row" gap={1} justifyContent="space-between">
        {actionIcons.map((action, index) => (
          <IconButton
            key={index}
            sx={{
              backgroundColor: action.color,
              borderRadius: "42%",
              padding: 2,
              flex: 1,
              width: "100%",
              height: "70px",
            }}
          >
            {action.icon}
          </IconButton>
        ))}
      </Stack>
      <Divider />

      <>
        <UserProfilesMenu
          open={params.get("profiles") === "true"}
          onClose={() => handleClose("profiles")}
          defaultProfile={defaultProfile}
          userProfiles={useProfiles}
        />
        <SearchModal
          open={params.get("search") == "true"}
          onClose={() => handleClose("search")}
        />
        <CameraSearchModal
          open={params.get("cameraSearch") === "true"}
          onClose={() => handleClose("cameraSearch")}
        />
      </>
    </Stack>
  );
};
