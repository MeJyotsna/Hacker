const initialState = {
  newsFeed: "",
};

const newsFeedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NEWS_FEED": {
      // console.log("frm reducer", action);
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
