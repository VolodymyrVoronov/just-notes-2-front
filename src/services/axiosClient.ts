import { useAuthStore } from '../store/authStore';
import createAxiosClient from './createAxiosClient';

const BASE_URL = 'http://localhost:5000/api/';
const REFRESH_TOKEN_URL = `${BASE_URL}auth/refresh`;

const getCurrentAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

const getCurrentRefreshToken = (): string | null => {
  return useAuthStore.getState().refreshToken;
};

const setRefreshedTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}): void => {
  const { login } = useAuthStore.getState();
  login(tokens);
};

const logOut = async () => {
  const { logout } = useAuthStore.getState();

  logout();
};

const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logOut,
  setRefreshedTokens,
});

export default client;
