import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
// AppModule.ts
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Utilisez le nom du service Docker comme hôte
      port: 5432,
      database: 'db-auth',
      username: 'admin',
      password: 'admin',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true, // Ne mettez pas à true en production
    }),
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
