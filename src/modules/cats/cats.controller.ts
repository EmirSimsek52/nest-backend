import { Controller, Get, Post, Put, Delete, Body, Param, Res, UseGuards, Request } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth..guard';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response, @Request() req) {
    await this.catsService.create(createCatDto);
    return res.json({ message: 'Cat created successfully', statusCode: 200 });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const cats = await this.catsService.findAll();
    return res.json(cats);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const cat = await this.catsService.findOne(id);
    return res.json(cat);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @Res() res: Response, @Request() req) {
    const updatedCat = await this.catsService.update(id, updateCatDto);
    return res.json({ message: 'Cat updated successfully', statusCode: 200, data: updatedCat });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response, @Request() req) {
    await this.catsService.remove(id);
    return res.json({ message: 'Cat deleted successfully', statusCode: 200 });
  }
}
