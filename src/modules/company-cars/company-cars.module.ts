import { Module } from '@nestjs/common';
import { CompanyCarsController } from './company-cars.controller';
import { CompanyCarsService } from './company-cars.service';

@Module({
  controllers: [CompanyCarsController],
  providers: [CompanyCarsService]
})
export class CompanyCarsModule {}
