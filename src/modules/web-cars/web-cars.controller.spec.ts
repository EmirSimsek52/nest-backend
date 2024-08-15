import { Test, TestingModule } from '@nestjs/testing';
import { WebCarsController } from './web-cars.controller';

describe('WebCarsController', () => {
  let controller: WebCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebCarsController],
    }).compile();

    controller = module.get<WebCarsController>(WebCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
