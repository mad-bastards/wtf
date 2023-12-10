import { Chain } from './chain.js';
import {Account} from "./account.js";
export class Wallet {
    node;
    chains = new Map();
    accounts = new Map();

    constructor(mnemonic) {
        this.node = mnemonic.node;
        this.chains = Chain.chains;
        Object.keys(this.chains).forEach((key)=>{
            const chain = Chain.chains.chains;
            const account = new Account(this.node, chain);
            console.log(account);
            this.accounts[key]=account;
        });
    }
    getSymbols() {
        console.log("Wallet Symbols: "+this.accounts);
        return Object.keys(this.accounts);
    }
    getAccount(sym) {
        const account = this.accounts[sym];
        if (account == null)
            throw new Error("account not found");
        return account;
    }
    showAddrs() {
        const syms = this.getSymbols();
        for (const sym of syms) {
            const account = this.getAccount(sym);
            const address = account.getAddress(0);
            console.log({ address });
        }
    }
}
