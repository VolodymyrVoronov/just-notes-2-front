import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Token } from '../types';

const setTokensToLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  localStorage.setItem(Token.AccessToken, accessToken);
  localStorage.setItem(Token.RefreshToken, refreshToken);
};

const removeTokensFormLocalStorage = (): void => {
  localStorage.removeItem(Token.AccessToken);
  localStorage.removeItem(Token.RefreshToken);
};

interface IAuthStore {
  accessToken: string | null;
  refreshToken: string | null;
}

interface IAuthStoreActions {
  isLoggedIn: () => boolean;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

export const useAuthStore = create(
  immer<IAuthStore & IAuthStoreActions>((set, get) => ({
    accessToken: localStorage.getItem(Token.AccessToken) || null,
    refreshToken: localStorage.getItem(Token.RefreshToken) || null,
    isLoggedIn: () => !!get().accessToken,
    login: (tokens: { accessToken: string; refreshToken: string }) => {
      setTokensToLocalStorage(tokens);
      set((state) => {
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
      });
    },
    logout: () => {
      removeTokensFormLocalStorage();
      set((state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
    },
  })),
);
