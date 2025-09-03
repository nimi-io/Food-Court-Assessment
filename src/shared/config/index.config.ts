import * as Joi from 'joi';

import { ConfigModuleOptions } from '@nestjs/config';

export interface ConfigAttributes {
	port: number;
	appEnv: string;

	jwt: {
		secret: string;
		expiresIn: string;
	};
	database: {
		host: string;
		port: number;
		username: string;
		dbname: string;
		password: string;
	};
}
const config = (): ConfigAttributes => ({
	port: process.env.PORT ? +process.env.PORT : 4001,
	appEnv: process.env.APP_ENV || 'development',
	jwt: {
		secret: process.env.JWT_SECRET || 'N8kNKyW36E9cv1EOLlTjsgDwR9uX',
		expiresIn: process.env.JWT_EXPIRES_IN || '30m',
	},
	database: {
		host: process.env.POSTGRES_HOST || 'localhost',
		port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
		username: process.env.POSTGRES_USERNAME || 'postgres',
		dbname: process.env.POSTGRES_NAME || 'FoodCity',
		password: process.env.POSTGRES_PASSWORD || 'password',
	},
});

const schema = Joi.object<Record<string, string>>({
	PORT: Joi.string().default('4001'),
	APP_ENV: Joi.string().default('development'),
	POSTGRES_HOST: Joi.string().default('localhost'),
	POSTGRES_PORT: Joi.string().default('5432'),
	POSTGRES_USERNAME: Joi.string().default('postgres'),
	POSTGRES_PASSWORD: Joi.string().default('password'),
	POSTGRES_NAME: Joi.string().default('FoodCity'),
	JWT_SECRET: Joi.string().default('N8kNKyW36E9cv1EOLlTjsgDwR9uX'),
	JWT_EXPIRES_IN: Joi.string().default('30m'),
});

export const configModuleOpts: ConfigModuleOptions = {
	cache: false,
	isGlobal: true,
	load: [config],
	validationSchema: schema,
};

export default config;
