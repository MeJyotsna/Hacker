import "regenerator-runtime/runtime";

const BASE_URL = "https://hn.algolia.com/api/v1";
const FETCH_NEWS_FEED = "FETCH_NEWS_FEED";
const SET_UPVOTE_COUNT = "SET_UPVOTE_COUNT";
const NEWS_STORAGE_KEY = "news_feed";
const NEWS_FEED_SHOW = 0;
const NEWS_FEED_HIDE = 1;

export const dispatchNewsFeeds = (data) => ({
  type: FETCH_NEWS_FEED,
  payload: data,
});
// export const fetchNewsFeedTest = async (base, destination) => {
//   try {
//     const result = await fetch(
//       `https://api.exchangeratesapi.io/latest?base=${base}`
//     );
//     const data = await result.json();
//     console.log("------------", data);
//     return data.rates[destination];
//   } catch (e) {
//     return null;
//   }
// };
export const fetchNewsFeed = (start, end) => async (dispatch) => {
  let feeds = [];
  for (let i = start; i < end; i++) {
    await fetch(BASE_URL + "/items/" + parseInt(i))
      .then((response) => response.json())
      .then((data) => {
        let results = data;
        if (results.title != null) {
          console.log("----from actions page api call result", results);
          let title = results.title;
          let id = results.id;
          let author = results.author;
          let url = results.url;
          let timeStamp = results.created_at_i;
          let vote_count = results.points;
          let commentCount = results.children.length;
          let date = new Date(timeStamp * 1000);
          let posted_time =
            date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
          let storage_item = localStorage.getItem(NEWS_STORAGE_KEY + id);
          let parse_storage_item = JSON.parse(storage_item);
          let vote_storage_count =
            parse_storage_item != null ? parse_storage_item.vote_count : 0;
          let show_hide_status =
            parse_storage_item != null &&
            parse_storage_item.hide &&
            parse_storage_item.hide === NEWS_FEED_HIDE
              ? NEWS_FEED_HIDE
              : NEWS_FEED_SHOW;
          if (show_hide_status === NEWS_FEED_SHOW) {
            let news_results = {
              id: id,
              title: title,
              author: author,
              time: posted_time,
              url: url,
              vote_count:
                vote_storage_count > vote_count
                  ? vote_storage_count
                  : vote_count,
              comments: commentCount,
              hide: show_hide_status,
            };
            feeds.push(news_results);
            localStorage.setItem(
              NEWS_STORAGE_KEY + id,
              JSON.stringify(news_results)
            );
            dispatch(dispatchNewsFeeds(feeds));
          }
        }
      })
      .catch((error) => {
        console.log("Error Feed -- " + i + " == " + error);
      });
  }
};

export const dispatchVoteCount = (count) => ({
  type: SET_UPVOTE_COUNT,
  payload: count,
});

export const setUpVoteCount = (vote) => (dispatch) => {
  console.log("Vote : setUpVoteCount Redux = " + JSON.stringify(vote));
  dispatch(dispatchVoteCount(vote));
};

export const hideNewsFeed = (feeds, id) => (dispatch) => {
  if (feeds != null) {
    let parseHide = JSON.parse(JSON.stringify(feeds));
    if (parseHide !== undefined) {
      let news = parseHide;
      let index = news.findIndex((el) => el.id === id);
      let item = news[index];
      news.splice(index, 1);
      let hide_results = {
        id: item.id,
        title: item.title,
        author: item.author,
        time: item.posted_time,
        url: item.url,
        vote_count: item.vote_count,
        comments: item.comments,
        hide: NEWS_FEED_HIDE,
      };
      localStorage.setItem(NEWS_STORAGE_KEY + id, JSON.stringify(hide_results));
      dispatch(dispatchNewsFeeds(news));
    }
  }
};
