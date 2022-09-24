import { Module } from '@nestjs/common';
import { Ingest } from './ingest';
import { Search } from './search';
import { SearchController } from './search/search.controller';

@Module({
  providers: [Ingest, Search],
  controllers: [SearchController]
})
export class DictionaryModule {}
