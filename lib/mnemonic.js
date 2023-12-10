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
  _words;
  _seed;
  _node;
  constructor(words) {
    if (Array.isArray(words))
      words = words.join(" ");
    words = words.split(/\s+/);
    if (words.length % 3) {
      throw new TypeError("phrase length should be divisible by 3");
    }
    this._words=words;
    this._seed=this.seed;
    this._node=this.node;
  }
  get seed() {
    if(!this._seed)
      this._seed=mnemonicToSeedSync(this.words.join(' '));
    return this._seed;
  }
  get node() {
    if(!this._node)
      this._node=deriveHdPrivateNodeFromSeed(this.seed);
    return this._node;
  }
  get words() {
    if(!this._words)
      throw new Error("I have no words!");
    return this._words;
  }
}
export const mnemonic = new Mnemonic(load());
