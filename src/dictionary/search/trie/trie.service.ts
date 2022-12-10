import { Injectable } from '@nestjs/common';

@Injectable()
export class TrieService {
    children: { [key: string]: TrieService } = {};
    isWord: boolean = false;
    description: string = undefined;
    currDesc: string = undefined;

    addWord(word: string, description: string): void {
        let curr: TrieService = this;
        for (const c of word) {
            if (!curr.children[c]) {
                curr.children[c] = new TrieService();
            }
            curr = curr.children[c];
        }
        curr.isWord = true;
        curr.description = description;
    }

    search(word: string): boolean {
        word = word.toLowerCase()
        console.log({ word })
        let curr: TrieService = this;
        for (let i = 0; i < word.length; i++) {
            const c = word[i]

            if (!(c in curr.children)) {
                return false;
            }

            if (curr.children[c]) {
                curr = curr.children[c]
            } else {
                // console.log({keys: Object.keys(curr.children)})
                console.log({ curr })
                return Object.keys(curr.children).length !== 0;
            }

            if (i === word.length - 1) {
                console.log('this.isEmpty(curr.children)')
                this.currDesc = curr.description;
                return curr.isWord;
            }

            console.log({
                c,
                i,
                len: word.length,
                children: curr.children,
                isWord: curr.isWord
            })
        }
        return false;
    }

    isEmpty(object: {}) {
        for (const property in object) {
            return false;
        }
        return true;
    }

    getCurrDesc(){
        return this.currDesc;
    }
}
