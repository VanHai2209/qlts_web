export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserLoginArgs {
  email: string;
  password: string;
}

export interface IUserLoginRes extends IUserToken {
  user: IUser;
}
