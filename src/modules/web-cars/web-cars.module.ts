import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebCarsController } from './web-cars.controller';
import { WebCars, WebCarsSchema } from './web-cars.schema';
import { WebCarsService } from './web-cars.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WebCars.name, schema: WebCarsSchema }]),
  ],
  controllers: [WebCarsController],
  providers: [WebCarsService],
})
export class WebCarsModule {}
