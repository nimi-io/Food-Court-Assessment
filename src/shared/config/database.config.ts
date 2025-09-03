import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigAttributes } from './index.config';
import { Knex } from 'knex';
import knex from 'knex';
import { Model } from 'objection';
import { Logger } from '@nestjs/common';

const getDatabaseConfig = (
  configService: ConfigService<ConfigAttributes>,
): Knex.Config => {
  const databaseConfig = configService.get('database', { infer: true });

  return {
    client: 'pg',
    connection: {
      host: databaseConfig?.host,
      user: databaseConfig?.username,
      password: databaseConfig?.password,
      database: databaseConfig?.dbname,
      port: databaseConfig?.port,
    },
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
    },
  };
};

@Injectable()
export class DatabaseProvider {
  private knex: Knex;
  private readonly logger = new Logger(DatabaseProvider.name);

  constructor(private configService: ConfigService<ConfigAttributes>) {
    // Initialize knex connection with the configuration
    this.knex = knex(getDatabaseConfig(this.configService));

    // Bind Knex to Objection's Model class
    Model.knex(this.knex);

    // Test the connection and log when connected
    this.testConnection();
  }

  private async testConnection(): Promise<void> {
    try {
      await this.knex.raw('SELECT 1');
      const databaseConfig = this.configService.get('database', {
        infer: true,
      });
      this.logger.log(
        `🗄️ Database connected successfully to ${databaseConfig?.host}:${databaseConfig?.port}/${databaseConfig?.dbname}`,
      );
    } catch (error) {
      this.logger.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  getKnex(): Knex {
    return this.knex;
  }
}
