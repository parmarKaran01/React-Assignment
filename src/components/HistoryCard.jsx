import { Card, CardContent, Typography } from "@mui/material";
import moment from "moment/moment";
import React from "react";

export const HistoryCard = ({ data }) => {
  return (
    <Card
      style={{
        width: "15rem",
        height: "15rem",
        cursor: "pointer",
      }}
    >
      <CardContent className="w-full h-full flex flex-col justify-evenly">
        <div className="w-full h-2/6 text-ellipsis overflow-hidden">
          <Typography fontSize={"1.5rem"} fontWeight={500}>
            {data?.name}
          </Typography>
        </div>
        <div className="w-full h-2/6 text-ellipsis overflow-hidden">
          <Typography>{data?.videoURL}</Typography>
        </div>
        <div className="w-full h-2/6 text-ellipsis overflow-hidden">
          <Typography>
            {moment(data?.timeStamp).startOf("hours").fromNow()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
