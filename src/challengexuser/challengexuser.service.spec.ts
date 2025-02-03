import { Test, TestingModule } from '@nestjs/testing';
import { ChallengexuserService } from './challengexuser.service';

describe('ChallengexuserService', () => {
  let service: ChallengexuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengexuserService],
    }).compile();

    service = module.get<ChallengexuserService>(ChallengexuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
