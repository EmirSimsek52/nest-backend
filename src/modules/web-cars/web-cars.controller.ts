import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth..guard';
import { CreateWebCarsDto } from './dto/create-webCars.dto';
import { UpdateWebCarsDto } from './dto/update.webCars.dto';
import { WebCarsService } from './web-cars.service';

@Controller('web-cars')
export class WebCarsController {
  constructor(private readonly webCarsService: WebCarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() request: Request,
    @Body() createWebCarsDto: CreateWebCarsDto,
  ) {
    try {
      const user = request.user;
      console.log(user);
      //@ts-ignore
      const companyName = user.companyName;
      console.log(user);
      const newCar = await this.webCarsService.create(
        createWebCarsDto,
        companyName,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Car successfully created',
        data: newCar,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const cars = (await this.webCarsService.findAll()).reverse();
      return {
        statusCode: HttpStatus.OK,
        message: 'Cars successfully retrieved',
        data: cars,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('company/:companyName')
  async findCompanyCars(@Param('companyName') companyName: string) {
    try {
      const cars = await this.webCarsService.findCompanyCars(companyName);
      const sortedCars = cars?.reverse().sort((a, b) => {
        if (a?.priority === b?.priority) {
          return (
            new Date(a?.updateAt).getTime() - new Date(b?.updateAt).getTime()
          );
        }
        return a?.priority - b?.priority;
      });

      if (sortedCars.length === 0) {
        return {
          message: 'No cars found for this company',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        data: sortedCars,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const car = await this.webCarsService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Car successfully retrieved',
        data: car,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWebCarsDto: UpdateWebCarsDto,
    @Req() request: Request,
  ) {
    try {
      const car = await this.webCarsService.findOne(id);
      const user = request.user;
      console.log('user', user);
      console.log('updateWebCarsDto', updateWebCarsDto);
      //@ts-ignore
      if (car.companyName != user.companyName) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You are not authorized to update this car',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      //@ts-ignore
      const updatedCar = await this.webCarsService.update(
        id,
        updateWebCarsDto,
        //@ts-ignore
        user.companyName,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Car successfully updated',
        data: updatedCar,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    try {
      const user = request.user;
      const car = await this.webCarsService.findOne(id);
      //@ts-ignore
      if (user?.companyName != car?.companyName) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You are not authorized to delete this car',
          },
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        await this.webCarsService.remove(id);
        return {
          statusCode: HttpStatus.OK,
          message: 'Car successfully deleted',
        };
      }
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
