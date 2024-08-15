import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWebCarsDto } from './dto/create-webCars.dto';
import { UpdateWebCarsDto } from './dto/update.webCars.dto';
import { WebCars, WebCarsDocument } from './web-cars.schema';

@Injectable()
export class WebCarsService {
  constructor(
    @InjectModel(WebCars.name) private webCarsModel: Model<WebCarsDocument>,
  ) {}

  async create(
    createWebCarsDto: CreateWebCarsDto,
    companyName: string,
  ): Promise<WebCars> {
    const newCar = new this.webCarsModel({
      ...createWebCarsDto,
      companyName,
    });
    return newCar.save();
  }

  async findAll(): Promise<WebCars[]> {
    return this.webCarsModel.find().exec();
  }

  async findOne(id: string): Promise<WebCars> {
    const car = await this.webCarsModel.findById(id).exec();
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async findCompanyCars(companyName: string): Promise<WebCars[]> {
    return this.webCarsModel
      .find({})
      .where('companyName')
      .equals(companyName)
      .exec();
  }

  async update(
    id: string,
    updateWebCarsDto: UpdateWebCarsDto,
    companyName: string,
  ): Promise<WebCars> {
    //@ts-ignore
    updateWebCarsDto.companyName = companyName;
    const updatedCar = await this.webCarsModel
      .findByIdAndUpdate(id, updateWebCarsDto, { new: true })
      .exec();
    if (!updatedCar) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return updatedCar;
  }

  async remove(id: string): Promise<void> {
    const result = await this.webCarsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }
}
