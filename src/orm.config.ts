import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

export function initTypeORMconfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRE_HOST,
    port: parseInt(process.env.POSTGRE_PORT),
    username: process.env.POSTGRE_USERNAME,
    password: process.env.POSTGRE_PASSWORD,
    database: process.env.POSTGRE_DB_NAME,
    synchronize: false,
    logging: process.env.APP_ENV === 'development',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    entities: [join(__dirname, '/**/*.entity.{ts,js}')],
    namingStrategy: new SnakeNamingStrategy(),
    cache: false,
  };
}
