// axiosMessage.js
const responseMessages = {
  200: "Success: OK",
  201: "Success: Created",
  204: "Success: No Content",
  206: "Partially: Partial Content",
};

const errorMessages = {
  400: "Bad Request: The server could not understand the request.",
  401: "Unauthorized: Authentication is required and has failed or has not been provided.",
  403: "Forbidden: The server understood the request but refuses to authorize it.",
  404: "Not Found: The requested resource could not be found.",
  500: "Internal Server Error: The server has encountered a situation it doesn't know how to handle.",
};

export const handleResponse = (response) => {
  const message =
    responseMessages[response.status] ||
    `Unexpected status: ${response.status}`;
  console.log(`${message}. Status: ${response.status}`);
  return response.data ? response.data.results : null;
};

export const handleAxiosError = (error) => {
  if (error.response) {
    const errorMessage =
      errorMessages[error.response.status] ||
      `An error occurred: ${error.response.statusText}`;
    console.error(`${errorMessage}. Status: ${error.response.status}`);
    throw new Error(errorMessage);
  } else if (error.request) {
    console.error("No response was received from the server", error.request);
    throw new Error("No response was received from the server");
  } else {
    console.error("An error occurred in setting up the request", error.message);
    throw new Error("An error occurred in setting up the request");
  }
};
