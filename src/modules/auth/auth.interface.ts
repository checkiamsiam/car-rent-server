export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
};
