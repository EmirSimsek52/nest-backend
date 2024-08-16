import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCarsController } from './company-cars.controller';

describe('CompanyCarsController', () => {
  let controller: CompanyCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyCarsController],
    }).compile();

    controller = module.get<CompanyCarsController>(CompanyCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
