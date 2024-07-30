import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './cats.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return (await this.catModel.find().exec()).reverse();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const existingCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    if (!existingCat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return existingCat;
  }

  async remove(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findByIdAndDelete(id).exec();
    if (!deletedCat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return deletedCat;
  }
}
