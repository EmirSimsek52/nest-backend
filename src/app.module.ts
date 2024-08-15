import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WebCarsModule } from './modules/web-cars/web-cars.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://emirer2024:maldomal123@sacarya.z7p5wrm.mongodb.net/?retryWrites=true&w=majority&appName=sacarya'), 
    CatsModule,
    AuthModule,
    UsersModule,
    WebCarsModule,
    ReservationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
