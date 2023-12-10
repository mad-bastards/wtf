import { Wallet } from "./wallet.js";
import { mnemonic } from "./mnemonic.js";

const wallet = new Wallet(mnemonic);
wallet.showAddrs();
