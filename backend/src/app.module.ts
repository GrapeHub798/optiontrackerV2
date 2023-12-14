import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JournalModule } from './journal/journal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
