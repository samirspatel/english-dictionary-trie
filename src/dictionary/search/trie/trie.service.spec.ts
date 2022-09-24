import { Test, TestingModule } from '@nestjs/testing';
import { TrieService } from './trie.service';

describe('TrieService', () => {
  let service: TrieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrieService],
    }).compile();

    service = module.get<TrieService>(TrieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
