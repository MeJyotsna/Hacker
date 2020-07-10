import React from "react";
import { connect } from "react-redux";
import { fetchNewsFeed, setUpVoteCount, hideNewsFeed } from "./actions";
import { LineChart } from "react-chartkick";
import "chart.js";
import * as moment from "moment";
import "./css/componentStyle.css";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1,
      end: 31,
    };
  }

  componentDidMount() {
    this.props.fetchNewsFeed(this.state.start, this.state.end);
  }

  previousPage() {
    var end = this.state.end > 61 ? this.state.end - 30 : 31;
    var start = this.state.start > 31 ? this.state.start - 30 : 1;
    this.setState({
      end: end,
      start: start,
    });
    this.props.fetchNewsFeed(start, end);
  }

  nextPage() {
    var end = this.state.end + 30;
    var start = this.state.start + 30;
    this.setState({
      end: end,
      start: start,
    });
    this.props.fetchNewsFeed(start, end);
  }

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
    var graph_item = JSON.stringify(statistics);
    graph_item = graph_item.replace(/[{}]/g, "");
    graph_item = graph_item.replace("[", "{");
    graph_item = graph_item.replace("]", "}");
    var data = JSON.parse(graph_item);
    return <LineChart data={data} />;
  };
  getUrl(el) {
    if (el != undefined) {
      var ol = el
        .replace("http://", "")
        .replace("https://", "")
        .split(/[/?#]/)[0];
      return ol;
    }
  }
  renderVoteCount = (item) => {
    var id = item.id;
    var votes;
    var vote = JSON.parse(JSON.stringify(this.props.voteCount)).voteCount;
    if (id == vote.id) {
      console.log("inside if----------", vote);
      votes = vote.vote_count;
    } else {
      console.log("inside else----------", vote);
      var storage_item = localStorage.getItem("news_feed" + id);
      var parse_storage_item = JSON.parse(storage_item);
      var voteCount =
        parse_storage_item != null ? parse_storage_item.vote_count : 0;
      votes = voteCount;
    }
    return <span className="">{votes}</span>;
  };

  handleUpvote = (item) => {
    console.log("clicked item", item);
    var id = item.id;
    var title = item.title;
    //fetching news feed with clicked news id
    var storageItem = localStorage.getItem("news_feed" + id);
    console.log("selected item from storge", storageItem);
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

  handleNewsHide = (newsId) => {
    this.props.hideNewsFeed(this.props.newsFeed.newsFeed, newsId);
  };
  render() {
    const listData = JSON.parse(JSON.stringify(this.props.newsFeed.newsFeed));
    console.log("Dddd", listData);
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
            {listData &&
              listData.length > 0 &&
              listData.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
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