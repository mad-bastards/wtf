import { Wallet } from "./wallet.js";
import { mnemonic } from "./mnemonic.js";

export function displayHex(mystery) {
  let buf = Buffer.from('0xffff')
  console.log(buf);
  console.log(mystery);
}


const wallet = new Wallet(mnemonic);
const syms = wallet.getSymbols();
for(let i=0;i<syms.length;i++) {
  const sym = syms[i];
  const account = wallet.getAccount(sym);
  const addr = account.getAddress(0);
  console.log({sym, addr});
}
console.log("done");
