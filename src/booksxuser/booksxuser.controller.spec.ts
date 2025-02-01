import { Test, TestingModule } from '@nestjs/testing';
import { BooksxuserController } from './booksxuser.controller';

describe('BooksxuserController', () => {
  let controller: BooksxuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksxuserController],
    }).compile();

    controller = module.get<BooksxuserController>(BooksxuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
