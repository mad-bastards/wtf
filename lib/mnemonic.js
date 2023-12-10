import { readFileSync } from 'fs';
import { mnemonicToSeedSync } from "bip39";
import { deriveHdPrivateNodeFromSeed } from "@bitauth/libauth";
function load() {
    const txt = readFileSync("./mnemonic.txt").toString().trim();
    const words = txt.split(/\s+/);
    const len = words.length;
    if (len % 3)
        throw new Error("mnemonic phrase length should be multiple of 3");
    return words.join(" ");
}
export class Mnemonic {
    words;
    constructor(words) {
        if (Array.isArray(words))
            words = words.join(" ");
        this.words = words.split(/\s+/);
        if (words.length % 3) {
            throw new TypeError("phrase length should be divisible by 3");
        }
    }
    get seed() {
        return mnemonicToSeedSync(this.words.join(' '));
    }
    get node() {
        return deriveHdPrivateNodeFromSeed(this.seed);
    }
}
export const mnemonic = new Mnemonic(load());
