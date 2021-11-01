import axios from "axios";

const { REACT_APP_PORT } = process.env;

export const userLogin = async (body) => {
  try {
    const loginResult = await axios.post(`${REACT_APP_PORT}/login`, body);
    return loginResult;
  } catch (error) {
    return error.message;
  }
};

export const getUserData = async (id) => {
  try {
    const getUserResult = await axios.get(`${REACT_APP_PORT}/users/${id}`);
    return getUserResult;
  } catch (error) {
    return error.message;
  }
};

export const getExploreTweet = async () => {
  try {
    const getExploreTweetResult = await axios.get(`${REACT_APP_PORT}/tweet`);
    return getExploreTweetResult;
  } catch (error) {
    return error.message;
  }
};
