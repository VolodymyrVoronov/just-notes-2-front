import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IUserStore {
  id: string;
  login: string;
}

interface IUserStoreActions {
  saveUserInfo: (user: IUserStore) => void;
  removeUserInfo: () => void;
}

export const useUserStore = create(
  immer<IUserStore & IUserStoreActions>((set) => ({
    id: '',
    login: '',

    saveUserInfo: (user: IUserStore) => {
      set((state) => {
        state.id = user.id;
        state.login = user.login;
      });
    },

    removeUserInfo: () => {
      set((state) => {
        state.id = '';
        state.login = '';
      });
    },
  })),
);
