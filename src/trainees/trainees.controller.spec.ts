import { Test, TestingModule } from '@nestjs/testing';
import { TraineesController } from './trainees.controller';

describe('TraineesController', () => {
  let controller: TraineesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraineesController],
    }).compile();

    controller = module.get<TraineesController>(TraineesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
