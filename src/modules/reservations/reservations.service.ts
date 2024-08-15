import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationsDto } from './dto/create-reservations.dto';
import { UpdateReservationsDto } from './dto/update-reservations.dto';
import { Reservations, ReservationsDocument } from './reservations.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservations.name)
    private reservationsModel: Model<ReservationsDocument>,
  ) {}

  async create(
    CreateReservationsDto: CreateReservationsDto,
    companyName: string,
  ): Promise<Reservations> {
    const newReservation = new this.reservationsModel({
      ...CreateReservationsDto,
      companyName,
    });
    return newReservation.save();
  }

  async findAll(): Promise<Reservations[]> {
    return this.reservationsModel.find().exec();
  }

  async findOne(id: string): Promise<Reservations> {
    const reservation = await this.reservationsModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async findCompanyReservations(companyName: string): Promise<Reservations[]> {
    return this.reservationsModel
      .find({})
      .where('companyName')
      .equals(companyName)
      .exec();
  }

  async update(
    id: string,
    updatedReservationDto: UpdateReservationsDto,
    companyName: string,
  ): Promise<Reservations> {
    //@ts-ignore
    updatedReservationDto.companyName = companyName;
    const updatedReservation = await this.reservationsModel
      .findByIdAndUpdate(id, updatedReservationDto, { new: true })
      .exec();
    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return updatedReservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservationsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
}
