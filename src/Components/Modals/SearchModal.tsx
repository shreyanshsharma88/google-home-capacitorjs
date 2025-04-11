import { ArrowBack, ArrowOutward } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Camera, Mic } from "lucide-react";
import { useTextSearch } from "../../Hooks";

export const SearchModal = ({ open, onClose }: ISearchModalProps) => {
  const { handleSearchChange, searchValue, searchResults } = useTextSearch();
  console.log({ searchResults });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      slotProps={{
        paper: {
          sx: {
            margin: 0,
            height: "100vh",
            p: 2,
          },
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchValue}
        autoFocus
        onChange={(e) => handleSearchChange(e.target.value)}
        slotProps={{
          input: {
           
            startAdornment: (
              <InputAdornment onClick={onClose} position="start">
                <ArrowBack />
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
                >
                  <Camera />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
        <Stack direction="column" gap={1}>
          {searchResults?.map((item) => {
            return (
              <Stack
                key={item.title}
                alignItems="center"
                direction="row"
                gap={1}
              >
                <IconButton
                  LinkComponent={"a"}
                  href={item.link}
                  target="_blank"
                  sx={{ color: "#9aa0a6" }}
                >
                  <ArrowOutward />
                </IconButton>
                <Typography
                  sx={{
                    width: "350px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
    </Dialog>
  );
};

interface ISearchModalProps {
  open: boolean;
  onClose: () => void;
}
