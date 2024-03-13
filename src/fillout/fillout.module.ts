import { Module } from '@nestjs/common';
import { FilloutService } from './fillout.service';

@Module({
  providers: [FilloutService],
  exports: [FilloutService]
})
export class FilloutModule {}
