import React from "react";
import "../css/componentStyle.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1,
      end: 31,
      listData: [],
      showtable: false,
    };
  }

  componentDidMount() {
    this.fetchNewsFeed();
  }
  fetchNewsFeed = () => {
    const { start, end, listData } = this.state;
    let arr = [];
    for (var i = start; i < end; i++) {
      fetch("https://hn.algolia.com/api/v1/items/" + i)
        .then((response) => response.json())
        .then((result) => {
          listData.push(result);
          this.setState(listData);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  previousPage() {
    var endPage = this.state.end > 61 ? this.state.end - 30 : 31;
    var startPage = this.state.start > 31 ? this.state.start - 30 : 1;
    this.setState({
      end: endPage,
      start: startPage,
    });
    this.fetchNewsFeed(startPage, endPage);
  }

  nextPage() {
    var endPage = this.state.end + 30;
    var startPage = this.state.start + 30;
    this.setState({
      endPage: end,
      startPage: start,
    });
    this.fetchNewsFeed(startPage, endPage);
  }
  handleUpvote() {
    console.log("jksajxhbj");
  }

  render() {
    console.log("state", this.state.listData);
    const listData = this.state.listData;
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
            {listData.length > 0 &&
              listData.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.children.length}</td>
                    <td>{item.points}</td>
                    <td>
                      <img
                        onClick={() => handleUpvote}
                        className="upvotebtn"
                        src="https://assets.hackbotone.com/images/icons/up_arrow.png"
                        alt="upvote"
                      />
                    </td>
                    <td>{item.title}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="clearfix">
          <div className="float-right">
            {/* <div className="prevBtn btn" onClick={previousPage}>Previous</div>
            <div className="nextBtn btn" onClick={nextPage}>
              Next
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
