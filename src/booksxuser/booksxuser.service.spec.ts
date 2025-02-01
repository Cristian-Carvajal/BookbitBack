import { Test, TestingModule } from '@nestjs/testing';
import { BooksxuserService } from './booksxuser.service';

describe('BooksxuserService', () => {
  let service: BooksxuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksxuserService],
    }).compile();

    service = module.get<BooksxuserService>(BooksxuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
