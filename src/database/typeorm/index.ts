import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
    database: string;
}

export default getConnectionOptions().then(async (options) => {
  const newOptions = options as IOptions;

  newOptions.host = process.env.DB_HOST || '';
  newOptions.database = process.env.DB_DATABASE || '';

  return createConnection({
    ...options,
  });
});
