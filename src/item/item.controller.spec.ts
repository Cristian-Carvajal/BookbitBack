import { Test, TestingModule } from '@nestjs/testing';
import { itemController } from './item.controller';

describe('itemController', () => {
  let controller: itemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [itemController],
    }).compile();

    controller = module.get<itemController>(itemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
