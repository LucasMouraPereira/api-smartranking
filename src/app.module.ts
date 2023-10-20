import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NODE_DB_CONNECT, {
      useUnifiedTopology: true,
    } as MongooseModuleOptions),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
