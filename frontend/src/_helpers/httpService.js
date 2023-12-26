import axios from "axios";

const axiosInstance = axios.create({
  // You can set common config here, like baseURL, headers, etc.
});

const getArrayFromErrorMessage = (errorMessages) => {
  if (!errorMessages) {
    return [];
  }
  return Array.isArray(errorMessages) ? errorMessages : [errorMessages];
};

// Function to handle errors and convert them into an array of strings
const handleErrors = (error) => {
  let errorMessages = [];
  if (error.response) {
    // Request made and server responded with a status code
    // that falls out of the range of 2xx
    const errors = getArrayFromErrorMessage(error.response.data.error);
    const messages = getArrayFromErrorMessage(error.response.data.message);
    const combinedErrors = [...errors, ...messages];
    errorMessages = combinedErrors.map(
      (err) => (err?.message ? err?.message : err) || "Unknown server error",
    );
  } else if (error.request) {
    // The request was made but no response was received
    errorMessages = ["No response was received from the server"];
  } else {
    // Something happened in setting up the request that triggered an error
    errorMessages = [error.message];
  }
  return errorMessages;
};

// Generic function to make HTTP requests
const makeRequest = async (method, url, data, token) => {
  try {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: handleErrors(error) };
  }
};

export const get = (url, token) => makeRequest("get", url, null, token);
export const post = (url, data, token) => makeRequest("post", url, data, token);
export const put = (url, data, token) => makeRequest("put", url, data, token);
export const patch = (url, data, token) =>
  makeRequest("patch", url, data, token);
export const del = (url, token) => makeRequest("delete", url, null, token);
