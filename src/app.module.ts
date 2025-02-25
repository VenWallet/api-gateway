import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
// import config from './config/database/typeorm.config';
// import { AppConfigModule } from './config/app.config';
import { AppController } from './app.controller';
import { HttpCustomModule } from './shared/http/http.module';
import { MicroBlockchainModule } from './modules/micro-blockchain/micro-blockchain.module';
import { MicroCoreModule } from './modules/micro-core/micro-core.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DagroMicroMarketModule } from './modules/dagro-micro-market/dagro-micro-market.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    HttpCustomModule,
    MicroBlockchainModule,
    MicroCoreModule,
    DagroMicroMarketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
