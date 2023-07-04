import type { AxiosRequestConfig } from 'axios';
import client from './axiosClient';

export function register({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  return client.post('auth/register', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
}

export function logIn({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  return client.post('auth/login', { login, password }, {
    authorization: false,
  } as AxiosRequestConfig);
}

export function getProfile() {
  return client.get('/users/profile');
}
