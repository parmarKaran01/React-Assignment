import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactPlayer from "react-player/youtube";
import { useDispatch } from "react-redux";
import { addVideoToHistory } from "../config/historySlice";

export const CardModal = ({ open, setOpen, data }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "70vh",
    bgcolor: "white",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5" component="h2">
            {data?.name}
          </Typography>
          <div className="w-full flex flex-row items-center justify-center">
            <ReactPlayer
              url={data?.videoURL}
              controls={true}
              width={500}
              height={300}
              onPlay={() => {
                const payload = {
                  ...data,
                  timeStamp : new Date().getTime()
                }
                dispatch(addVideoToHistory(payload));
              }}
            ></ReactPlayer>
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
