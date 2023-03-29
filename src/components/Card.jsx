import { Delete, Edit } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bucketStateSelector, updateBucket } from "../config/bucketSlice";
import { APP_URL } from "../config/constant";
import { fetchCardList } from "../config/thunk";
import { CardModal } from "./CardModal";

export default function CardComponent({ data, index, parentId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {buckets} = useSelector(bucketStateSelector)

  const deleteCard = async (id) => {
    await axios.delete(`${APP_URL}/${id}`);
  };

  const {
    mutate,
    isLoading: deleting,
    isSuccess: deleted,
  } = useMutation(deleteCard, {
    onSuccess: (data) => {
      console.log(data);
      dispatch(fetchCardList());
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const handleDelete = (id) => {
    const newState = JSON.parse(JSON.stringify(buckets))
    newState[parentId].items = newState[parentId].items.filter((val) => val.id !== id) 
    console.log("This is the element after deleting", newState)
    dispatch(updateBucket(newState))
    mutate(id);
  };

  const handleEdit = (id) => {
    navigate(`editCard/${data.id}`, {
      state: {
        parentId: parentId,
      },
    });
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="py-2"
        >
          <CardModal open={open} setOpen={setOpen} data={data} />
          <Card
            style={{
              width: "15rem",
              height: "15rem",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          >
            <CardContent className="w-full h-full flex flex-col justify-evenly">
              <div className="w-full h-2/6 text-ellipsis overflow-hidden">
                <Typography fontSize={"1.5rem"} fontWeight={500}>
                  {data.name}
                </Typography>
              </div>
              <div className="w-full h-2/6 text-ellipsis overflow-hidden">
                <Typography>{data.videoURL}</Typography>
              </div>

              <div className="w-full flex flex-row items-center justify-end gap-4">
                <div>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(data.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </div>

                <div>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(data.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
