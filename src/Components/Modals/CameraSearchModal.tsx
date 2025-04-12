import CloseIcon from '@mui/icons-material/Close';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface CameraSearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const CameraSearchModal = ({ open, onClose }: CameraSearchModalProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? 'user' : 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const takePicture = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/jpeg'));
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    startCamera();
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  // Initialize camera when modal opens
  useEffect(() => {
    if (open) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [open, stream]);

  return (
    <Dialog fullScreen open={open} onClose={closeCamera} PaperProps={{ sx: { bgcolor: 'black' } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        position: 'relative'
      }}>
        {/* Header */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          zIndex: 1
        }}>
          <Typography variant="h6" color="white">
            Google Lens
          </Typography>
          <IconButton onClick={closeCamera} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Camera Preview */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          {photo ? (
            <img 
              src={photo} 
              alt="Captured" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' 
              }} 
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </Box>

        {/* Camera Controls */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          zIndex: 1
        }}>
          {/* Action Buttons - Only visible when photo is taken */}
          {photo && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mb: 3,
              gap: 1
            }}>
              <Button 
                variant="contained" 
                startIcon={<TranslateIcon />}
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  flex: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Translate
              </Button>
              <Button 
                variant="contained" 
                startIcon={<SearchIcon />}
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  flex: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Search
              </Button>
              <Button 
                variant="contained" 
                startIcon={<MenuBookIcon />}
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  flex: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                Homework
              </Button>
            </Box>
          )}

          {/* Camera Controls */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3
          }}>
            {/* Flip Camera Button */}
            <IconButton 
              onClick={toggleCamera}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <FlipCameraIosIcon />
            </IconButton>

            {/* Capture Button */}
            <IconButton
              onClick={takePicture}
              sx={{
                width: 64,
                height: 64,
                border: '2px solid white',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Box sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'white'
              }} />
            </IconButton>

            {/* Gallery Button - Placeholder */}
            <Box sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};