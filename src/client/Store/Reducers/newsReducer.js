const initialState = {
  newsFeed: "",
};

//for news feed data
const newsFeedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NEWS_FEED": {
      return {
        ...state,
        newsFeed: action.payload,
      };
    }
    default:
      return state;
  }
};

export default newsFeedsReducer;
