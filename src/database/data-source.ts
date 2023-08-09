import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgres://essmar_admin:sBq96DrG&7hM@essmar-api-db.cijsron7ychl.us-east-1.rds.amazonaws.com:5432/postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: '',
  password: '',
  database: '',
  logging: false,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
