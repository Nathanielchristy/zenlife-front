import { AuthBindings } from "@refinedev/core";
import axios, { AxiosInstance, AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import useRoleStore from "./store";
import { io, Socket } from "socket.io-client";

export const TOKEN_KEY = "refine-auth";
export const SOCKET_KEY = "refine-socket";

const backendMainURL = "http://3.29.90.15:5000"; // Replace this with your actual backend URL
const backendUrl = "http://3.29.90.15:5000/api"; // Replace this with your actual backend URL

// Create an Axios instance with default configurations
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Include this line to send cookies with all requests
});

// Add a request interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/authUser/login", {
        email,
        password,
      });
      const { token, ...userData } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem("Username", response.data.name);
      sessionStorage.setItem("userRole", userData.role);
      useRoleStore.getState().setRole(userData.role);
      console.log(response.data);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          // Handle HTTP 400 error (Bad Request)
          return {
            success: false,
            redirectTo: "/login",
            error: {
              name: "LoginError",
              message: "Invalid username or password",
            },
          };
        } else {
          console.log(error);
          // Handle other errors
          return {
            success: false,
            redirectTo: "/login",
          };
        }
      } else {
        // Handle non-Axios errors
        console.log(error);
        return {
          success: false,
          redirectTo: "/login",
          error: {
            name: "ServerError",
            message: "An unexpected error occurred. Please try again later.",
          },
        };
      }
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.get("/authUser/logout");
      if (response.status === 200) {
        // Clear cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Clear local storage and session storage
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem("userRole");
        localStorage.removeItem(SOCKET_KEY);

        // Reset role in store
        useRoleStore.getState().setRole("guest");

        // Redirect to login
        window.location.href = "/login";

        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      return {
        success: false,
      };
    }
  },
  check: async () => {
    try {
      const response = await axiosInstance.get("/authUser/loggedin");
      const isLoggedIn = response.data.isLoggedIn;
      if (isLoggedIn) {
        return {
          authenticated: true,
        };
      }
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    try {
      const response = await axiosInstance.get("/authUser/getuser");
      const userData = response.data;
      useRoleStore.getState().setRole(userData.role);
      sessionStorage.setItem("userRole", userData.role);
      return {
        id: userData._id,
        name: userData.name,
        avatar: userData.photo,
        empid: userData.empid,
        role: userData.role,
      };
    } catch (error) {
      console.error(error); // Log the error for debugging
      if ((error as AxiosError).response?.status === 401) {
        // If the response status is 401, redirect to the login page
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem("userRole");
        useRoleStore.getState().setRole("guest");
        window.location.href = "/login";
      }
      throw new Error("Failed to fetch user identity");
    }
  },
  onError: async (error) => {
    console.error(error); // Log the error for debugging
    return { error };
  },
  forgotPassword: async ({ email }) => {
    try {
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "User Error",
          message: "Invalid email",
        },
      };
    }
  },
};
