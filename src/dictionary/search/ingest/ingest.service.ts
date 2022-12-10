import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { join } from 'path';
import { readdirSync } from 'fs';
import { TrieService } from '../trie/trie.service';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs/promises');

type Word = {
    name: string;
    kind: string | null;
    description: string;
}

@Injectable()
export class IngestService implements OnModuleInit {

    private readonly logger = new Logger(IngestService.name);
    private words: Word[] = [];

    constructor(private readonly trie: TrieService) { }

    async onModuleInit() {
        const dataDir = join(__dirname, '../../../../', 'src/dictionary/OPTED/v003');
        this.logger.log(`Attempting to parse files in ${dataDir}`);
        const files = readdirSync(dataDir);
        for (const file of files) {
            try {
                const data = await fs.readFile(`${dataDir}/${file}`, { encoding: 'utf8' });
                const dom = new JSDOM(data);
                const pees: NodeList = dom.window.document.querySelectorAll("p")
                const entries: IterableIterator<[number, Node]> = pees.entries();

                let numWordsInFile = 0;
                for (let [_, e] of entries) {
                    numWordsInFile++;
                    const line = e.textContent;
                    let pieces = line.split(" ");
                    const word = pieces[0].toLowerCase(); // !
                    
                    const parenRegExp = /\(([^)]+)\)/;
                    const kindMatches = parenRegExp.exec(line);
                    const kind = kindMatches ? kindMatches[1] : null;

                    pieces = line.split(") ");
                    let description = pieces[1];
                    this.insertWordInTrie({
                        name: word, kind, description
                    })
                }
                this.logger.log(`Parsed ${numWordsInFile} words from ${file}`);
            } catch (err) {
                console.log(err);
            }
        }
        this.logger.log(`Parsed a total of ${this.words.length} words`);
    }

    getWords() {
        return this.words.slice(1, 100);
    }

    onApplicationShutdown(signal: string) {
        this.logger.log(`Shutdown signal received: ${signal}`); // e.g. "SIGINT"
    }

    // @todo: Implement trie
    private insertWordInTrie(word: Word) {
        this.trie.addWord(word.name, word.description);
        this.words.push(word)
    }

}
