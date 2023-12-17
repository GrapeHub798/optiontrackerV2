import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EodhdModule } from './eodhdapi/eodhd.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { JournalModule } from './journal/journal.module';
import { OptionsModule } from './options/options.module';
import { StocksModule } from './stocks/stocks.module';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      database: process.env.DB_DB,
      dialect: 'mysql',
      host: 'localhost',
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      username: process.env.DB_USER,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    JournalModule,
    ExchangesModule,
    StocksModule,
    EodhdModule,
    OptionsModule,
    TradeModule,
    HttpModule.register({
      maxRedirects: 5,
      timeout: 5000,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
