import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationsDocument = Reservations & Document;

@Schema()
export class Reservations {
  @Prop({ required: true })
  departureDate: string;

  @Prop({ required: true })
  returnDate: string;

  @Prop({ required: true })
  carName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: true })
  departureLocation: string;

  @Prop({ required: true })
  returnLocation: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: 'newRez' })
  status: 'newRez' | 'approved' | 'rejected' | 'pastRez' | 'onRez';

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservations);
