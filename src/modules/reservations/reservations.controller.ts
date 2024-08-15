import {
  Body,
  Controller,
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
import { CreateReservationsDto } from './dto/create-reservations.dto';
import { ReservationsService } from './reservations.service';
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('company/:companyName')
  async create(
    @Param('companyName') companyName: string,
    @Req() request: Request,
    @Body() createReservationDto: CreateReservationsDto,
  ) {
    try {
      const reservation = await this.reservationsService.create(
        createReservationDto,
        companyName,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Reservation successfully created',
        data: reservation,
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

  @UseGuards(JwtAuthGuard)
  @Get(':companyName')
  async findCompanyReservations(
    @Req() request: Request,
    @Param('companyName') companyName: string,
  ) {
    const user = request?.user;

    try {
      //@ts-ignore
      if (user?.companyName !== companyName) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You are not authorized to view these reservations',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const reservations =
        await this.reservationsService.findCompanyReservations(companyName);
      return {
        statusCode: HttpStatus.OK,
        message: 'Reservations successfully retrieved',
        data: reservations,
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
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateReservationDto: CreateReservationsDto,
  ) {
    try {
      const user = request.user;

      const rez = await this.reservationsService.findOne(id);
      //@ts-ignore
      if (rez.companyName !== user.companyName) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You are not authorized to update this reservation',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      //@ts-ignore
      const reservation = await this.reservationsService.update(
        id,
        updateReservationDto,
        //@ts-ignore
        user?.companyName,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Reservation successfully updated',
        data: reservation,
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

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    try {
      //@ts-ignore
      const user = request?.user;
      const reservation = await this.reservationsService.findOne(id);
      //@ts-ignore
      if (reservation.companyName != user.companyName) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You are not authorized to view this reservation',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reservation successfully retrieved',
        data: reservation,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
