const initialState = {
  voteCount: "",
};

//for vote count handling
const voteCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_UPVOTE_COUNT": {
      return {
        ...state,
        voteCount: action.payload,
      };
    }
    default:
      return state;
  }
};

export default voteCountReducer;
