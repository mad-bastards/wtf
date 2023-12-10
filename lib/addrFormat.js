import { binToBase58, CashAddressNetworkPrefix, CashAddressType, encodeCashAddress, hash256 } from "@bitauth/libauth";
import { hex } from "./util.js";
import {
} from './buffer.js';
class BitcoinFormat {
    format(publicKeyHash) {
        console.log(prettyPrint(publicKeyHash));
        const len = publicKeyHash.length;
        const arr = new Uint8Array(len + 5);
        arr.set(publicKeyHash, 1);
        console.log(hex(arr));
        const checksum = hash256(arr).subarray(0, 4);
        arr.set(checksum, len + 1);
        return binToBase58(arr);
    }
}
class BitcoinCashFormat {
    format(publicKeyHash) {
        console.log(publicKeyHash.length);
        const type = CashAddressType.p2pkh;
        const prefix = CashAddressNetworkPrefix.mainnet;
        return encodeCashAddress(prefix, type, publicKeyHash);
    }
}
export function getFormats(sym) {
    const res = new Map;
    if (sym === "bch") {
        res.set("legacy", new BitcoinFormat());
        res.set("cashaddr", new BitcoinCashFormat());
    }
    else if (sym == "btc") {
        res.set("legacy", new BitcoinFormat());
    }
    else {
        res.set("standard", new BitcoinFormat());
    }
    return res;
}
