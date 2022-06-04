export interface TokenUserData {
  name: string;
  username: string;
  id: string;
}

export interface UserState {
  name: string;
  username: string;
  id: string;
  logged: boolean;
}

export interface AxiosReturn {
  status: number;
  data: {
    token: string;
  };
}

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  logged: boolean;
}

export interface RegisterFormData {
  [name: string]: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface Label {
  id: string;
  type: string;
  text: string;
  icon: JSX.Element;
}
