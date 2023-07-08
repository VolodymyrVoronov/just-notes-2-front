import type { AxiosRequestConfig } from 'axios';

import client from './axiosClient';

export const register = ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  return client.post('auth/register', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
};

export const logIn = ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  return client.post('auth/login', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
};

export const getProfile = () => {
  return client.get('/users/profile');
};

export const getAllNotes = () => {
  return client.get('/notes/all', {
    id: 'all-notes',
  });
};

export const createNote = ({
  note,
  color,
  favorite,
}: {
  note: string;
  color: string;
  favorite?: boolean;
}) => {
  return client.post(
    '/notes/create',
    { note, color, favorite },
    {
      cache: {
        update: {
          'all-notes': 'delete',
        },
      },
    },
  );
};

export const deleteNote = (id: number) => {
  return client.delete(`/notes/delete/${id}`, {
    cache: {
      update: {
        'all-notes': 'delete',
      },
    },
  });
};

export const addToFavorite = (id: number, favorite: boolean) => {
  return client.patch(
    `/notes/favorite/${id}`,
    { id, favorite },
    {
      cache: {
        update: {
          'all-notes': 'delete',
        },
      },
    },
  );
};

export const updateNote = (id: number, note: string) => {
  return client.patch(
    `/notes/update/${id}`,
    { id, note },
    {
      cache: {
        update: {
          'all-notes': 'delete',
        },
      },
    },
  );
};
