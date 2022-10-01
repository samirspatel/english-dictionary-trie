import { Injectable } from '@nestjs/common';

@Injectable()
export class TrieService {
    children: { [key: string]: TrieService } = {};
    isWord: boolean = false;

    addWord(word: string): void {
        console.log({word})
        let curr: TrieService = this;
        for (const c of word) {
            console.log({c})
            if (!curr.children[c]) {
                console.log('adding ', c)
                curr.children[c] = new TrieService();
            }
            curr = curr.children[c];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        console.log({ word })
        let curr: TrieService = this;
        for (let i = 0; i < word.length; i++) {
            const c = word[i].toLowerCase();
            const children = Object.keys(curr.children);
            console.log({
                c,
                children,
                isWord: curr.isWord
            })

            if (curr.children && c in curr.children) {
                curr = curr.children[c];
            }
        }
        return true;
    }
}
