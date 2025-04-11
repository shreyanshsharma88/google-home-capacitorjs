import { Close, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import {
    Box,
    Collapse,
    Dialog,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import { useState } from "react";
import { IProfile } from "../../Hooks";
export const UserProfilesMenu = ({
    open,
    onClose,
    defaultProfile,
    userProfiles,
  }: IUserProfileMenuProps) => {
    const [showAllProfiles, setShowAllProfiles] = useState(false);
    return (
      <Dialog onClose={onClose} open={open}>
        <Stack gap={3}>
          <Stack
            direction="row"
            width="65%"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton onClick={onClose} sx={{ backgroundColor: "transparent" }}>
              <Close />
            </IconButton>
            <Typography variant="h5" textAlign="center" fontWeight={700}>
              Google
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" gap={1} width="100%">
              <Box
                component="img"
                sx={{
                  borderRadius: "100%",
                  cursor: "pointer",
                  width: "55px",
                  height: "55px",
                }}
                src={defaultProfile.image}
              />
              <Stack direction="column">
                <Typography fontSize={'20px'} fontWeight={700}>{defaultProfile.name}</Typography>
                <Typography fontWeight={700}>{defaultProfile.email}</Typography>
              </Stack>
            </Stack>
            <IconButton onClick={() => setShowAllProfiles(p => !p)} sx={{border : '0.5px solid', p:0}}>
              {showAllProfiles ? (
                <KeyboardArrowDownOutlined />
              ) : (
                <KeyboardArrowUpOutlined />
              )}
            </IconButton>
          </Stack>
          <Collapse in={showAllProfiles}>
          <Stack direction='column' gap={1}>
            {
              userProfiles.map((profile, index) => {
                if (profile.id !== defaultProfile.id) {
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" gap={1} width="100%">
                        <Box
                          component="img"
                          sx={{
                            borderRadius: "100%",
                            cursor: "pointer",
                            width: "50px",
                            height: "50px",
                          }}
                          src={profile.image}
                        />
                        <Stack direction="column">
                          <Typography fontSize={'20px'} fontWeight={700}>{profile.name}</Typography>
                          <Typography fontWeight={700}>{profile.email}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  );
                }
              })
            }
          </Stack>
          </Collapse>
        </Stack>
      </Dialog>
    );
  };
  
  interface IUserProfileMenuProps {
    open: boolean;
    onClose: () => void;
    userProfiles: IProfile[];
    defaultProfile: IProfile;
  }
  