import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import Row from "./Row";
import "../css/componentStyle.css";

const Dashboard = () => {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(31);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    getNewsFeedData();
  }, []);

  // const getNewsFeedData = () => {
  //   for (let i = start; i < end; i++) {
  //     fetch("https://hn.algolia.com/api/v1/items/" + i)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         // console.log("result", result);
  //         //el.push();
  //         return <Row data={result} />;
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   }
  // };
  let el = [];
  async function getNewsFeedData() {
    for (let i = start; i < end; i++) {
      try {
        let newsListData = await fetch(
          "https://hn.algolia.com/api/v1/items/" + i
        );
        newsListData = await newsListData.json();
        el.push(newsListData);
        // localStorage.setItem("items", el);
        console.log("el", el);
      } catch (error) {
        console.log("error", error);
      }
    }
  }
  console.log("el", el);
  // localStorage.setItem("items", el);
  return (
    <div className="container">
      <table
        className="table"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        border="0"
      >
        <thead>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>Upvote</th>
            <th>News details</th>
          </tr>
        </thead>
        <tbody>{el}</tbody>
      </table>
      <div class="clearfix">
        <div class="float-right">
          <div class="prevBtn btn">Previous</div>
          <div class="nextBtn btn">Next</div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
