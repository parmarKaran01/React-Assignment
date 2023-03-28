import {
  Button,
  Drawer,
  IconButton,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { cardStateSelector } from "./config/cardSlice";
import { historyStateSelector } from "./config/historySlice";
import { HistoryCard } from "./components/HistoryCard";
import { Close } from "@mui/icons-material";

export const removeFromList = (list, index) => {
  const result = Array.from(list.items);
  console.log("ascnanc result", result);
  const [removed] = result.splice(index, 1);
  const newList = {
    ...list,
    items: result,
  };
  return [removed, newList];
};

export const addToList = (list, index, element) => {
  const result = Array.from(list.items);
  result.splice(index, 0, element);
  const newList = {
    ...list,
    items: result,
  };
  return newList;
};
const onDragEnd = (result, bucks, setBucks) => {
  const { source, destination } = result;

  if (!destination) return;
  if (destination.droppableId === source.droppableId) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  const listCopy = { ...bucks };

  const sourceList = listCopy[source.droppableId];
  console.log("source list", sourceList);
  const [removedElement, newSourceList] = removeFromList(
    sourceList,
    source.index
  );

  console.log("++++++", newSourceList, "0000", removedElement);

  listCopy[source.droppableId] = newSourceList;

  const destinationList = listCopy[result.destination.droppableId];
  listCopy[result.destination.droppableId] = addToList(
    destinationList,
    result.destination.index,
    removedElement
  );

  setBucks(listCopy);
};

function App() {
  const { cardList } = useSelector(cardStateSelector);
  const { historyList } = useSelector(historyStateSelector);

  const [drawerOpen, setDrawerOpen] = useState(false);

  console.log("This is the card list ", cardList);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigate = useNavigate();

  const [bucks, setBucks] = useState({
    [uuidv4()]: {
      name: "main",
      items: cardList,
    },
  });
  useEffect(() => {
    setBucks((prev) => {
      console.log("this is the prev state", prev);
      const newObj = Object.assign({}, prev);
      if (newObj[Object.keys(prev)].items) {
        newObj[Object.keys(prev)].items = cardList;
        console.log("This is the new Obj", newObj, "cardList", cardList);
        return {
          ...newObj,
        };
      }
    });
  }, [cardList]);

  const [bucketName, setBucketName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (bucketName.length > 0) {
      setBucks((prev) => {
        return {
          ...prev,
          [uuidv4()]: {
            name: bucketName,
            items: [],
          },
        };
      });
      setBucketName("");
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, bucks, setBucks);
      }}
    >
      <div className="w-full mt-12 px-12">
        <Stack
          flexDirection={"row"}
          flexWrap={true}
          columnGap={"2rem"}
          alignItems="center"
          justifyContent={"end"}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/createCard")}
          >
            {" "}
            Add New Card
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setDrawerOpen(true)}
          >
            Show History
          </Button>
        </Stack>

        <div className="w-full flex flex-row items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row items-center gap-4"
          >
            <TextField
              onChange={(e) => setBucketName(e.target.value)}
              type="text"
              value={bucketName}
              label="Bucket Name"
            />
            <Button type="submit" variant="contained" className="h-[50px]">
              create bucket
            </Button>
          </form>
        </div>

        <Outlet context={{ bucks, setBucks }} />

        <Drawer anchor="left" open={drawerOpen}>
          <div className="w-[17rem] px-2 py-4">
            <div className="w-full flex flex-row items-center justify-between">
              <Typography>Watch History</Typography>
              <IconButton onClick={() => handleDrawerClose()}>
                <Close />
              </IconButton>
            </div>
            <List className="w-full flex flex-col items-center justify-center gap-2">
              {historyList &&
                historyList.map((item, index) => {
                  return <HistoryCard data={item} />;
                })}
            </List>
          </div>
        </Drawer>
      </div>
    </DragDropContext>
  );
}

export default App;
