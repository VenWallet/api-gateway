import { Module } from '@nestjs/common';
import { MicroBlockchainController } from './micro-blockchain.controller';
import { HttpCustomModule } from 'src/shared/http/http.module';

@Module({
  imports: [HttpCustomModule],
  controllers: [MicroBlockchainController],
  providers: [],
})
export class MicroBlockchainModule {}
