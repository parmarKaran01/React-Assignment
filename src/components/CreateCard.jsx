import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { APP_URL } from "../config/constant";
import { fetchCardList } from "../config/thunk";

export const getCards = async() => {
  try{
    const res = await axios.get("http://localhost:3000/cardList")
    const data = res.data
    return data
  } catch(err) {
    console.log(err)
  }
}

const CreateCard = () => {
  const [name, setName] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const createNewCard = async (payload) => {
    const res = await axios.post(APP_URL, payload);
    return res.data;
  };
  const { mutate, isLoading} = useMutation(createNewCard, {
    onSuccess: (data) => {
      console.log(data);
      setName("");
      setVideoURL("");
      dispatch(fetchCardList())
      navigate("/");
      
    },

    onError: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: uuidv4(),
      name,
      videoURL,
      bucketId : "mainList"
    };

    // createNewCard(payload);
    mutate(payload);
    console.log(name, videoURL);
  };
  return (
    <>
      <div className="w-full h-full grid place-content-center">
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
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Link"
                  type={"text"}
                  onChange={(e) => setVideoURL(e.target.value)}
                />
              </Stack>
              <LoadingButton type="submit" loading={isLoading}>
                Create
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateCard;
