import { Test, TestingModule } from '@nestjs/testing';
import { ItemxuserController } from './itemxuser.controller';

describe('ItemxuserController', () => {
  let controller: ItemxuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemxuserController],
    }).compile();

    controller = module.get<ItemxuserController>(ItemxuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
