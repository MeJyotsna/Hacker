import React from "react";
import { connect } from "react-redux";
import { fetchNewsFeed, setUpVoteCount, hideNewsFeed } from "./actions";
import { LineChart } from "react-chartkick";
import "chart.js";
import * as moment from "moment";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
    };
  }

  componentDidMount() {
    this.props.fetchNewsFeed(this.state.pageNumber);
  }

  // to open last page visited
  previousPage() {
    let page_number = this.state.pageNumber;
    if (page_number > 0) {
      let count = page_number - 1;
      this.setState({
        pageNumber: count,
      });
      this.props.fetchNewsFeed(count);
    }
  }

  //to open next page
  nextPage() {
    let page_number = this.state.pageNumber;
    let count = page_number + 1;
    this.setState({
      pageNumber: count,
    });
    this.props.fetchNewsFeed(count);
  }

  //rendering chart with the available page data
  renderChart = (results) => {
    var statistics = [];
    for (var i = 0; i < results.length; i++) {
      var id = results[i].id.toString();
      var storage_item = localStorage.getItem("news_feed" + id);
      var parse_storage_item = JSON.parse(storage_item);
      var vote_count =
        parse_storage_item != null ? parse_storage_item.vote_count : 0;
      var votes = vote_count;
      var item = { [id]: votes };
      statistics.push(item);
    }

    //stringifying and data handling as per react-chartkick
    var graph_item = JSON.stringify(statistics);
    graph_item = graph_item.replace(/[{}]/g, "");
    graph_item = graph_item.replace("[", "{");
    graph_item = graph_item.replace("]", "}");
    var data = JSON.parse(graph_item);
    return <LineChart data={data} />;
  };

  //open link in new tab
  getUrl(el) {
    if (el != undefined) {
      var ol = el
        .replace("http://", "")
        .replace("https://", "")
        .split(/[/?#]/)[0];
      return ol;
    }
  }

  //rendering latest vote count as per user events
  renderVoteCount = (item) => {
    var id = item.id;
    var votes;
    var vote = JSON.parse(JSON.stringify(this.props.voteCount)).voteCount;
    if (id == vote.id) {
      votes = vote.vote_count;
    } else {
      var storage_item = localStorage.getItem("news_feed" + id);
      var parse_storage_item = JSON.parse(storage_item);
      var voteCount =
        parse_storage_item != null ? parse_storage_item.vote_count : 0;
      votes = voteCount;
    }
    return <span className="">{votes}</span>;
  };

  handleUpvote = (item) => {
    var id = item.id;
    var title = item.title;

    //fetching news feed with clicked news id
    var storageItem = localStorage.getItem("news_feed" + id);
    var parsedStorageItem = JSON.parse(storageItem);
    var parsedStorageTitle = parsedStorageItem.title;
    var parsedStorageVote = parsedStorageItem.vote_count;

    //check if the clicked data matches local storage's news feed
    if (title == parsedStorageTitle) {
      var newVoteCount = parseInt(parsedStorageVote) + 1;
      var news_results = item;
      news_results.showUpvoteBtn = false;
      news_results.vote_count = newVoteCount;
      localStorage.setItem("news_feed" + id, JSON.stringify(news_results));
      this.props.setUpVoteCount(news_results);
    }
  };

  // to hide the specific news feed
  handleNewsHide = (newsId) => {
    this.props.hideNewsFeed(this.props.newsFeed.newsFeed, newsId);
  };

  render() {
    const listData = JSON.parse(JSON.stringify(this.props.newsFeed.newsFeed)); // getting newsfeed data from props
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
              <th>Comments</th>
              <th>Vote Count</th>
              <th>Upvote</th>
              <th>News details</th>
            </tr>
          </thead>
          <tbody>
            {listData && listData.length === 0 && (
              <tr>
                <td>No Data Found.</td>
              </tr>
            )}
            {listData &&
              listData.length > 0 &&
              listData.map((item) => {
                return (
                  <tr>
                    <td>{item.comments}</td>
                    <td>{this.renderVoteCount(item)}</td>
                    <td>
                      <img
                        onClick={() => this.handleUpvote(item)}
                        className="upvotebtn"
                        src="https://news.ycombinator.com/grayarrow2x.gif"
                        alt="upvote"
                        title="upvote"
                      />
                    </td>
                    <td>
                      {item.title}{" "}
                      <span>
                        <a
                          href={item.url}
                          className=""
                          target="_blank"
                          className="linkColor"
                        >
                          ({this.getUrl(item.url)})
                        </a>{" "}
                        <span className="linkColor">by</span>{" "}
                        <b>{item.author}</b>
                        <span className="linkColor">
                          {" "}
                          {moment(new Date(item.time), "").fromNow()}
                        </span>
                        <span
                          className="hideBtn linkColor"
                          onClick={() => this.handleNewsHide(item.id)}
                        >
                          {" "}
                          [ <span className="btn_hide">hide</span>]
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="clearfix">
          <div className="float-right">
            <div className="prevBtn btn" onClick={() => this.previousPage()}>
              Previous
            </div>
            <div className="nextBtn btn" onClick={() => this.nextPage()}>
              Next
            </div>
          </div>
        </div>
        <hr />
        <div className="clearfix footer-wrap">
          <div>
            <p className="votes">Votes</p>
          </div>
          {this.renderChart(listData)}
        </div>
        <div className="id-wrap">
          <p className="id">ID</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newsFeed: state.newsFeed,
  voteCount: state.voteCount,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewsFeed: (start, end) => dispatch(fetchNewsFeed(start, end)),
  setUpVoteCount: (item) => dispatch(setUpVoteCount(item)),
  hideNewsFeed: (feeds, id) => dispatch(hideNewsFeed(feeds, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
