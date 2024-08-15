import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebCarsDocument = WebCars & Document;

@Schema()
export class WebCars {
  @Prop({ required: true })
  carName: string;

  @Prop()
  kmLimit: number;

  @Prop()
  dailyPrice: number;

  @Prop()
  gear: string;

  @Prop()
  fuelType: string;

  @Prop()
  seat: number;

  @Prop({ default: false })
  isOnWeb: boolean;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: Date.now })
  updateAt: Date;

  @Prop()
  priority: number;
}

export const WebCarsSchema = SchemaFactory.createForClass(WebCars);
