import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'the-database.sqlite'),
      entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
      synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
