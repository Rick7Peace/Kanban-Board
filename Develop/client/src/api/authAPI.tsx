// Importing the UserLogin interface to define the shape of the userInfo object
import { UserLogin } from "../interfaces/UserLogin";

// The login function that takes userInfo (of type UserLogin) and performs an asynchronous login request
const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // Making the actual POST request to the '/auth/login' endpoint
    const response = await fetch('/auth/login', {
      method: 'POST', // HTTP method to send data (POST is used for submitting data)
      headers: {
        'Content-Type': 'application/json', // Specifying that the request body contains JSON data
      },
      // Converting the userInfo object to a JSON string to send it in the request body
      body: JSON.stringify(userInfo),
    });

    // Parsing the JSON response body from the server
    const data = await response.json();

    // If the response status is not OK (e.g., 4xx, 5xx errors), throw an error
    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    // Returning the parsed data (e.g., user info, token, etc.)
    return data;
  } catch (error) {
    // Catching any errors that occur during the request and logging them
    console.log('Error from user login: ', error);

    // Returning a rejected promise with a custom error message
    return Promise.reject('Could not fetch user info');
  }
}

// Exporting the login function so it can be used in other parts of the application
export { login };
