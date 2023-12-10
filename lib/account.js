import { Chain } from "./chain.js";
import { Node } from "./node.js";
export class Account {
    chain;
    root;
    nodes = [];
    constructor(root, chain) {
        this.root = root;
        this.chain = chain;
    }
    get sym() {
        return this.chain['syn'];
    }
    getDerivationPath() {
        return this.chain.derivationPath;
    }
    getNode(idx) {
        if (!this.nodes[idx])
            this.nodes[idx] = new Node(this, idx);
        return this.nodes[idx];
    }
    getAddress(idx) {
        const node = this.getNode(idx);
        const chain = this.chain;
        return chain.formatAddress(node.publicKeyHash);
    }
}
