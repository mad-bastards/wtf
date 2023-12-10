import {getFormats} from './addrFormat.js';
import '@copblock/json-rw';

export class Chain {
    static chains = JSON.read('chains/main.json');
    data;

    constructor(data) {
        if (!(this instanceof Chain))
            throw new Error("Not a Chain.  Call with new");
        this.data = data;
    }
    get name() {
        return this.data.name;
    }
    get versions() {
        return this.data.versions;
    }
    get formats() {
        const data=this.data;
        if(!data.formats)
            data.formats=getFormats(this.sym);
        return data.formats;
    }
    get style() {
        if(this.sym === 'bch') {
            return 'cashaddr';
        } else {
            return 'legacy';
        }
    }
    get unit() {
        return this.data.unit.toString();
    }
    get sym() {
        return this.data.unit.toLowerCase();
    }
    get bip44() {
        return this.data.versions.bip44;
    }
    get derivationPath() {
        return `m/44'/${this.bip44}'/0'/0`;
    }
    formatAddress(publicKeyHash) {
        const sym = this.sym;
        const style=this.style;
        let format = this.formats.get(style);
        format ||= this.formats.get('standard');
        if(!format)
            throw new Error("No Format!");
        const addr = format.format(publicKeyHash);
        console.log({sym,style,format,publicKeyHash,addr});
        return addr;
    }
}
