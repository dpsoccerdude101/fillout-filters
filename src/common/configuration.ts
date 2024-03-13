import * as process from 'process';

type IConfig = {
  apiKey: string;
  apiUrl: string;
};

export default (): IConfig => ({
  apiKey: process.env.API_KEY ?? '',
  apiUrl: process.env.API_URL ?? '',
});
