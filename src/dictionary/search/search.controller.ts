import { Controller, Get, Param } from '@nestjs/common';
import { IngestService } from './ingest/ingest.service';
import { TrieService } from './trie/trie.service';


@Controller()
export class SearchController {

    constructor(
        private readonly trie: TrieService,
        private readonly ingest: IngestService
    ) { }

    @Get('/search/:word')
    search(@Param() params: { word: string }) {
        // console.log(this.trie.children['a']);
        const word = params.word;
        const isWord = this.trie.search(word);
        
        return { isWord, word, desc: this.trie.getCurrDesc() };
    }

    @Get('/trie')
    tries() {
        const words = this.trie;
        return JSON.stringify(words);
    }
}
