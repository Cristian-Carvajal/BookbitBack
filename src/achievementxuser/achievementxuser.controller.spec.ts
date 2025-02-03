import { Test, TestingModule } from '@nestjs/testing';
import { AchievementxuserController } from './achievementxuser.controller';

describe('AchievementxuserController', () => {
  let controller: AchievementxuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementxuserController],
    }).compile();

    controller = module.get<AchievementxuserController>(AchievementxuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
