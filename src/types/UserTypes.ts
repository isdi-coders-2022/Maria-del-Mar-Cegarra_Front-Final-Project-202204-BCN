export interface TokenUserData {
  name: string;
  username: string;
  id: number;
}

export interface UserState {
  name: string;
  username: string;
  id: number;
  logged: boolean;
}

export interface AxiosReturn {
  status: Number;
  data: {
    token: string;
  };
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  logged: boolean;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}
