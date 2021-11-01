import {
  ADD_TWEET,
  GET_TWEETS,
  DELETE_TWEET,
  UPDATE_TWEET,
  GET_TWEETS_ID,
} from "./type";
import axios from "axios";

export const getAllTweets = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/tweet/${id}`
      );
      dispatch({ type: GET_TWEETS_ID, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTweets = () => {
  return (dispatch) => {
    try {
      dispatch({ type: GET_TWEETS });
      return true;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTweet = (params) => {
  return async (dispatch) => {
    try {
      let body = {
        tweetBody: params.tweetBody,
        userId: params.userId,
      };
      const response = await axios.post("http://localhost:5000/tweet/", body);
      dispatch({ type: ADD_TWEET, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTweet = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tweet/${id}`);
      dispatch({ type: DELETE_TWEET, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTweet = (params) => {
  const { id, tweetBody, update_date } = params;
  return async (dispatch) => {
    try {
      let body = {
        tweetBody: tweetBody,
        update_date: update_date,
      };
      const response = await axios.put(
        `http://localhost:5000/tweet/${id}`,
        body
      );
      dispatch({ type: UPDATE_TWEET, data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
