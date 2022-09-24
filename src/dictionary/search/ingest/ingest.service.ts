import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
const jsdom = require("jsdom");
const { JSDOM, NodeList, Node, HTMLParagraphElement } = jsdom;
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

    async onModuleInit() {
        const dataDir = join(__dirname, '../../../../', 'src/dictionary/OPTED/v003');
        this.logger.log(`Attempting to parse files in ${dataDir}`);
        const files = readdirSync(dataDir);
        for (const file of files) {
            try {
                this.logger.log(`Parsing words from ${file}`);
                const data = await fs.readFile(`${dataDir}/${file}`, { encoding: 'utf8' });
                const dom = new JSDOM(data);
                const pees: NodeList = dom.window.document.querySelectorAll("p")
                const entries: IterableIterator<[number, Node]> = pees.entries();
                let numWordsInFile = 0;
                for (let [_, e] of entries) {
                    numWordsInFile++;
                    const line = e.textContent;
                    let pieces = line.split(" ");
                    const word = pieces[0]; // !
                    const parenRegExp = /\(([^)]+)\)/;
                    const kindMatches = parenRegExp.exec(line);
                    const kind = kindMatches ? kindMatches[1] : null;
                    pieces = line.split(") ");
                    let description = pieces[1];
                    this.insertWordInTrie({
                        name: word, kind, description
                    })
                }
                this.logger.log(`Parsed ${numWordsInFile} words`);
            } catch (err) {
                console.log(err);
            }
        }
        this.logger.log(`Parsed a total of ${this.words.length} words`);
    }

    onApplicationShutdown(signal: string) {
        this.logger.log(`Shutdown signal received: ${signal}`); // e.g. "SIGINT"
    }

    // @todo: Implement trie
    private insertWordInTrie(word: Word) {
        this.words.push(word)
    }

}
