import { Module } from '@nestjs/common';
import { HttpCustomModule } from 'src/shared/http/http.module';
import { MicroCoreController } from './micro-core.controller';

@Module({
  imports: [HttpCustomModule],
  controllers: [MicroCoreController],
  providers: [],
})
export class MicroCoreModule {}
