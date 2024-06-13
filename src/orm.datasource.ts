import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { initTypeORMconfig } from './orm.config';
dotenv.config();

export default new DataSource(initTypeORMconfig());
