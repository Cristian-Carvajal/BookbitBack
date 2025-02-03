import { Test, TestingModule } from '@nestjs/testing';
import { itemService } from './item.service';

describe('itemService', () => {
  let service: itemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [itemService],
    }).compile();

    service = module.get<itemService>(itemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
