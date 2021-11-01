import {
  GET_TWEETS,
  ADD_TWEET,
  DELETE_TWEET,
  UPDATE_TWEET,
  GET_TWEETS_ID,
} from "./type";

const initialState = {
  tweetList: [],
  tweetListExplore: false,
  deleteResult: null,
  addResult: null,
  updateResult: null,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TWEETS_ID:
      return {
        ...state,
        tweetList: action.data,
      };
    case GET_TWEETS:
      return {
        ...state,
        tweetListExplore: !state.tweetListExplore,
      };
    case ADD_TWEET:
      return {
        ...state,
        addResult: action.data,
      };
    case DELETE_TWEET:
      return {
        ...state,
        deleteResult: action.data,
      };
    case UPDATE_TWEET:
      return {
        ...state,
        updateResult: action.data,
      };
    default:
      return state;
  }
};

export default tweetReducer;
