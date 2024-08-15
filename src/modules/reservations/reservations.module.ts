import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsController } from './reservations.controller';
import { Reservations, ReservationsSchema } from './reservations.schema';
import { ReservationsService } from './reservations.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservations.name, schema: ReservationsSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
