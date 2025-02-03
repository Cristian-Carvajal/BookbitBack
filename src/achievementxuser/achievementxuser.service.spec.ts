import { Test, TestingModule } from '@nestjs/testing';
import { AchievementxuserService } from './achievementxuser.service';

describe('AchievementxuserService', () => {
  let service: AchievementxuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchievementxuserService],
    }).compile();

    service = module.get<AchievementxuserService>(AchievementxuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
