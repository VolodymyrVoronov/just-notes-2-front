import axios from 'axios';
import type { CreateAxiosDefaults } from 'axios';

let failedQueue: any[] = [];
let isRefreshing = false;

const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

const createAxiosClient = ({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl,
  logOut,
  setRefreshedTokens,
}: {
  options: CreateAxiosDefaults;
  getCurrentAccessToken: () => string | null;
  getCurrentRefreshToken: () => string | null;
  refreshTokenUrl: string;
  logOut: () => void;
  setRefreshedTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => void;
}) => {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config: any) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      // In "axios": "^1.1.3" there is an issue with headers, and this is the workaround.
      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {}),
      );
      const refreshToken = getCurrentRefreshToken();

      // If error, process all the requests in the queue and logOut the user.
      const handleError = (e: Error) => {
        processQueue(e);
        logOut();
        return Promise.reject(e);
      };

      // Refresh token conditions
      if (
        refreshToken &&
        error.response?.status === 401 &&
        error.response.data.message === 'TokenExpiredError' &&
        originalRequest?.url !== refreshTokenUrl &&
        // eslint-disable-next-line no-underscore-dangle
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        isRefreshing = true;
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._retry = true;
        return client
          .post(refreshTokenUrl, {
            refreshToken,
          })
          .then((res) => {
            const tokens = {
              accessToken: res.data?.accessToken,
              refreshToken: res.data?.refreshToken,
            };
            setRefreshedTokens(tokens);
            processQueue(null);

            return client(originalRequest);
          }, handleError)
          .finally(() => {
            isRefreshing = false;
          });
      }

      // Refresh token missing or expired => logOut user...
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === 'TokenExpiredError'
      ) {
        return handleError(error);
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return client;
};

export default createAxiosClient;
