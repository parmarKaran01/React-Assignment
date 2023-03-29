import { LoadingButton } from "@mui/lab";
import {

  Card,

  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bucketStateSelector, updateBucketChildren } from "../config/bucketSlice";
import { cardStateSelector } from "../config/cardSlice";

const EditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {buckets} = useSelector(bucketStateSelector);
  const { id } = useParams();
  const {state} = useLocation()
  const parentId = state.parentId
  const { cardList } = useSelector(cardStateSelector);
  const [name, setName] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, videoURL);
    const payload = {
      id: id,
      name,
      videoURL,
      bucketId: parentId,
    };

    const newState = JSON.parse(JSON.stringify(buckets))
    newState[parentId].items.map((val) => {
      if(val.id === id){
        val.name = name,
        val.videoURL = videoURL
      }
    })
    console.log(newState)
dispatch(updateBucketChildren(newState))
    mutate(payload);
  };

  useEffect(() => {
    const obj = cardList.filter((item) => item.id === id);
    console.log(obj);
    setName(obj[0]?.name);
    setVideoURL(obj[0]?.videoURL);
  }, []);

  const editCard = async (payload) => {
    const res = await axios.put(
      `http://localhost:8000/cardList/${id}`,
      payload
    );
    return res.data;
  };
  const { mutate, isLoading} = useMutation(editCard, {
    onSuccess: (data) => {
      console.log(data);
      setName("");
      setVideoURL("");
      navigate("/");
    },

    onError: (data) => {
      console.log(data);
    },
  });

  console.log("name", name, "video", videoURL);

  return (
    <>
      <div className="w-full h-full grid place-content-center mt-8">
        <Card
          style={{
            width: "30rem",
          }}
        >
          <CardContent>
            <form onSubmit={onSubmit}>
              <Stack
                flex
                flexDirection={"column"}
                justifyContent="space-evenly"
                rowGap={"1rem"}
              >
                <TextField
                  label="Name of Card"
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Link"
                  type={"text"}
                  value={videoURL}
                  onChange={(e) => setVideoURL(e.target.value)}
                />
              </Stack>
              <LoadingButton type="submit" loading={isLoading}>
                Edit
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditPage;
