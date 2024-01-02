import axios from "axios";

const axiosInstance = axios.create({});

const getArrayFromErrorMessage = (errorMessages) => {
  if (!errorMessages) {
    return [];
  }
  return Array.isArray(errorMessages) ? errorMessages : [errorMessages];
};

const handleErrors = (error) => {
  let errorMessages = [];
  if (error.response) {
    const errors = getArrayFromErrorMessage(error.response.data.error);
    const messages = getArrayFromErrorMessage(error.response.data.message);
    const combinedErrors = [...errors, ...messages];
    errorMessages = combinedErrors.map(
      (err) => (err?.message ? err?.message : err) || "Unknown server error",
    );
  } else if (error.request) {
    errorMessages = ["No response was received from the server"];
  } else {
    errorMessages = [error.message];
  }
  return errorMessages;
};

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
