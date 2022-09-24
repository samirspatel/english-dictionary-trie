import { Module } from '@nestjs/common';
import { SearchController } from './search/search.controller';
import { TrieService } from './search/trie/trie.service';
import { IngestService } from './search/ingest/ingest.service';

@Module({
  providers: [TrieService, IngestService],
  controllers: [SearchController]
})
export class DictionaryModule {}
