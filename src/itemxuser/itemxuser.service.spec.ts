import { Test, TestingModule } from '@nestjs/testing';
import { ItemxuserService } from './itemxuser.service';

describe('ItemxuserService', () => {
  let service: ItemxuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemxuserService],
    }).compile();

    service = module.get<ItemxuserService>(ItemxuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
