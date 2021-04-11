// @ts-ignore
import { config } from 'dotenv';
import {
  AppConfig,
  DataBaseConfig,
  Environment,
  JwtConfig,
} from '../../../environment/environment';
import * as path from 'path';

const requiredDotEnvKeys = [
    'DB_SERVER',
    'DB_PORT',
    'DB_NAME',
    'DB_USERNAME',
    'DB_PASSWORD',
    'JWT_SECRET',
    'JWT_ACCESS_TOKEN_EXPIRE',
    'JWT_REFRESH_TOKEN_EXPIRE',
    'ADMIN_PASSWORD',
    'ADMIN_EMAIL',
    'APP_BASED_URL',
    'CRON_TIME'
];

const optionalDotEnvKeys: string[] = [];


export function initEnvironment(): AppConfig {
    console.log('process.env: ', process.env);
    config();
    const environment: Environment = {} as Environment;
    const missingKeys = [];
    for (const key of requiredDotEnvKeys) {
        const k = key as keyof Environment;
        if (!process.env[k]) {
            missingKeys.push(k);
        } else if (!environment[k]) {
            environment[k] = process.env[k];
        }
    }
    for (const key of optionalDotEnvKeys) {
        if (process.env[key]) {
            environment[key as keyof Environment] = process.env[key];
        }
    }
    if (missingKeys.length) {
        throw new Error('Missing environment variables: ' + missingKeys.join(', '));
    }

    console.log(__dirname);
    const dbConfig: DataBaseConfig = {
        type: 'postgres',
        host: environment.DB_SERVER,
        port: environment.DB_PORT,
        database: environment.DB_NAME,
        username: environment.DB_USERNAME,
        password: environment.DB_PASSWORD,
        synchronize: true,
        logging: true,
        entities: [
            path.join(__dirname, '../../**/*.entity.*')
        ],
        migrations: [
            path.join(__dirname, '../../../deployment/migrations/*')
        ],
        cli: {
            migrationsDir: path.join(__dirname, '../../../deployment/migrations'),
            entitiesDir: path.join(__dirname, '../../**/'),
        },
        migrationsRun: true,
        passwordAdmin: environment.ADMIN_PASSWORD,
        emailAdmin: environment.ADMIN_EMAIL
    };
    const jwtConfig: JwtConfig = {
        secret: environment.JWT_SECRET,
        accessTokenExpire: environment.JWT_ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: environment.JWT_REFRESH_TOKEN_EXPIRE,
    };


    const appConfig: Record<string, any> = {
      basedURL: environment.APP_BASED_URL,
      cron: environment.CRON_TIME
    } as any;

    return {
        database: dbConfig,
        jwt: jwtConfig,
        appConfig,
    } as AppConfig;
}

export const environment = initEnvironment();
