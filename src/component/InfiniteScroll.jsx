import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const InfiniteScroll = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const findData = async () => {
      try {
        const a = await fetch("https://jsonplaceholder.typicode.com/comments");
        const res = await a.json();
        setComments(res);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    findData();
  }, []);

  return (
    <>
      <div>InfiniteScroll</div>

      {comments?.map((elem, i) => (
        <div className="box">
          <div key={i}>
            <h4>{elem.name}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default InfiniteScroll;
