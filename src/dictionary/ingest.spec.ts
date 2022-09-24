import { Test, TestingModule } from '@nestjs/testing';
import { Ingest } from './ingest';

describe('Ingest', () => {
  let provider: Ingest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ingest],
    }).compile();

    provider = module.get<Ingest>(Ingest);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
