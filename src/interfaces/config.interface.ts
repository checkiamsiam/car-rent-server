interface IConfig {
  isDevelopment: boolean;
  port: number | string;
  dbUri: string | undefined;
  jwt: {
    secret: string;
    refreshSecret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
}

export default IConfig;
