import { deriveHdPath, hash160, secp256k1 } from "@bitauth/libauth";
import { u8a } from "./util.js";
export class Node {
    _publicKeyHash;
    _address;
    _idx;
    _account;
    constructor(account, idx) {
        this._idx = idx;
        this._account = account;
        this._node = this.deriveNode();
    }
    get account() {
        return this._account;
    }
    _node;
    get node() {
        return this._node;
    }
    _privateKey;
    get privateKey() {
        return this._privateKey ||= this.node.privateKey;
    }
    _publicKey;
    get publicKey() {
        if (!this._publicKey) {
            this._publicKey =
                u8a(secp256k1.derivePublicKeyCompressed(this.privateKey));
        }
        return this._publicKey;
    }
    get idx() {
        return this._idx;
    }
    get address() {
        const account = this.account;
        const chain = account.chain;
    }
    get derivationPath() {
        const account = this.account;
        return account?.getDerivationPath() + "/" + this.idx;
    }
    deriveNode() {
        return deriveHdPath(this.account.root, this.derivationPath);
    }
    get publicKeyHash() {
        if (!this._publicKeyHash) {
            this._publicKeyHash ||= hash160(u8a(this.publicKey));
            if (!this._publicKeyHash)
                throw new Error("no public key hash");
        }
        return this._publicKeyHash;
    }
}
