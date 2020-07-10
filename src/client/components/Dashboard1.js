import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import "../css/componentStyle.css";

const Dashboard = () => {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(5);
  const [showUpvoteBtn, setShowUpvoteBtn] = useState(true);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    getNewsFeedData();
  }, []);

  let el = [];
  async function getNewsFeedData() {
    for (let i = start; i < end; i++) {
      try {
        let newsListData = await fetch(
          "https://hn.algolia.com/api/v1/items/" + i
        );
        newsListData = await newsListData.json();
        el.push(newsListData);
        console.log("el", el);
      } catch (error) {
        console.log("error", error);
      }
    }
    setNewsList(el);
  }
  console.log("el", el);
  const previousPage = () => {
    var endPage = this.state.end > 61 ? this.state.end - 30 : 31;
    var startPage = this.state.start > 31 ? this.state.start - 30 : 1;
    this.setState({
      end: endPage,
      start: startPage,
    });
    this.fetchNewsFeed(startPage, endPage);
  };

  const nextPage = () => {
    var endPage = this.state.end + 30;
    var startPage = this.state.start + 30;
    this.setState({
      endPage: end,
      startPage: start,
    });
    this.fetchNewsFeed(startPage, endPage);
  };

  const handleUpvote = (newsId) => {
    console.log("news id--", newsId);
    setShowUpvoteBtn(false);
  };
  const handleUnvote = (newsId) => {
    console.log("newsid", newsId);
    setShowUpvoteBtn(true);
  };
  return (
    <div className="container">
      <table
        className="table"
        cellPadding="0"
        cellSpacing="0"
        width="100%"
        border="0"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>Upvote</th>
            <th>News details</th>
          </tr>
        </thead>
        <tbody>
          {newsList.length > 0 &&
            newsList.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.children.length}</td>
                  <td>{item.points}</td>
                  <td>
                    {showUpvoteBtn ? (
                      <img
                        onClick={() => handleUpvote(item.id)}
                        className="upvotebtn"
                        src="https://assets.hackbotone.com/images/icons/up_arrow.png"
                        alt="upvote"
                        title="upvote"
                      />
                    ) : (
                      <span></span>
                    )}
                  </td>
                  <td>
                    {item.title}
                    <p>
                      {showUpvoteBtn ? (
                        <span></span>
                      ) : (
                        <span
                          className="unvoteBtn links"
                          onClick={() => handleUnvote(item.id)}
                        >
                          unvote
                        </span>
                      )}
                      <span className="hideBtn links">hide</span>
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="clearfix">
        <div className="float-right">
          <div className="prevBtn btn" onClick={previousPage}>
            Previous
          </div>
          <div className="nextBtn btn" onClick={nextPage}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
