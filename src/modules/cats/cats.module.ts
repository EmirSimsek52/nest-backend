import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // Eğer CatsService'i başka modüllerde kullanmak istiyorsanız exports ekleyin
})
export class CatsModule {}
