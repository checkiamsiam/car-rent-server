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
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
}

export default IConfig;
