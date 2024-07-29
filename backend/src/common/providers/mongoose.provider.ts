import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseConnectionProvider implements OnModuleInit {
  private readonly logger = new Logger(MongooseConnectionProvider.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    // Manually trigger the connection to ensure it's established
    await this.connectToMongoDB();
  }

  private async connectToMongoDB() {
    try {
      await this.connection.db.command({ ping: 1 });
      this.logger.log('MongoDB connection successful');
      this.ensureDatabaseCreated();
    } catch (error) {
      this.logger.error('Error during MongoDB connection attempt:', error);
    }
  }

  private async ensureDatabaseCreated() {
    try {
      this.logger.debug('Checking if the database needs to be created...');
      const collections = await this.connection.db.listCollections().toArray();
      const collectionExists = collections.some(
        (col) => col.name === 'sampleCollection',
      );

      if (!collectionExists) {
        this.logger.log(
          'No collections found. Creating a sample collection to ensure the database is initialized.',
        );
        await this.connection.db.createCollection('sampleCollection');
        this.logger.log('Sample collection created successfully.');
      } else {
        this.logger.log(
          'Collections found:',
          collections.map((c) => c.name),
        );
      }
    } catch (error) {
      this.logger.error('Error while ensuring database creation:', error);
    }
  }
}
