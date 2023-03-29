import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { cardStateSelector } from "../config/cardSlice";
import {bucketStateSelector} from "../config/bucketSlice"
import CardComponent from "./Card";

const MainPage = () => {
  const dispatch = useDispatch();
  const { bucks, setBucks } = useOutletContext();
  const {buckets} = useSelector(bucketStateSelector)
  const { cardList, cardListLoading, cardListError } =
    useSelector(cardStateSelector);
   

  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#F67072",
    padding: grid,
    width: 250,
  });

  console.log("buck list", bucks);


  useEffect(() => {
console.log("checking how many time this page is called")
  }, [])

  if (cardListLoading) return <div>Loading....</div>;
  if (cardListError) return <div>Something went wrong!</div>;
  if (!cardList) return <div>No Cards in the list :( Add a new one</div>;
  return (
    <div className="w-full mt-12">
      <div className="w-full flex flex-row items-start justify-start p-8 bg-blue-300 gap-8 rounded-md">
        {buckets &&
          Object.entries(buckets).map(([id, bucket]) => {
            return (
              <div>
                {bucket.name}
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="flex flex-col items-center justify-start"
                      >
                        {bucket.items &&
                          bucket.items.map((val, index) => {
                            return (
                              <CardComponent
                                data={val}
                                index={index}
                                key={val.id}
                                parentId={id}
                              />
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;
