import { Module } from '@nestjs/common';
import { HttpCustomModule } from 'src/shared/http/http.module';
import { DagroMicroMarketController } from './dagro-micro-market.controller';

@Module({
  imports: [HttpCustomModule],
  controllers: [DagroMicroMarketController],
  providers: [],
})
export class DagroMicroMarketModule {}
