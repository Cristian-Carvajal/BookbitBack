import { Test, TestingModule } from '@nestjs/testing';
import { ChallengexuserController } from './challengexuser.controller';

describe('ChallengexuserController', () => {
  let controller: ChallengexuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengexuserController],
    }).compile();

    controller = module.get<ChallengexuserController>(ChallengexuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
