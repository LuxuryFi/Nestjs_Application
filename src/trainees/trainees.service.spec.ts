import { Test, TestingModule } from '@nestjs/testing';
import { TraineesService } from './trainees.service';

describe('TraineesService', () => {
  let service: TraineesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraineesService],
    }).compile();

    service = module.get<TraineesService>(TraineesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
