export enum RouterPath {
  Start = '/',
  Notes = '/notes',
}

export enum Key {
  Escape = 'Escape',
}

export interface IFormData {
  login: string;
  password: string;
  confirmPassword: string;
}

export enum Form {
  Login = 'login',
  Register = 'register',
}

export type FormType = Form.Login | Form.Register;

export enum Token {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export enum Color {
  orange = 'orange',
  yellow = 'yellow',
  purple = 'purple',
  blue = 'blue',
  lime = 'lime',
}

export interface INoteButton {
  id: number;
  color: keyof typeof Color;
}
