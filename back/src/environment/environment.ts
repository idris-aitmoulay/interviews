export interface DataBaseConfig {
    type: string;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
    cli: any;
    migrationsRun: boolean;
    passwordAdmin: string;
    emailAdmin: string;
}

export interface JwtConfig {
    secret: string;
    accessTokenExpire: number;
    refreshTokenExpire: number;
}


export interface Environment {
    DB_SERVER: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRE: number;
    JWT_REFRESH_TOKEN_EXPIRE: number;
    ADMIN_PASSWORD: string;
    ADMIN_EMAIL: string;
    APP_BASED_URL: string;
    [key: string]: string | number | undefined;
}

export interface AppConfig {
    database: DataBaseConfig;
    jwt: JwtConfig;
    appConfig: Record<string, any>;
}


