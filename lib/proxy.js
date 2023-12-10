// Stores the currently-being-typechecked object for error messages.
let obj = null;
export class ChainProxy {
    hashGenesisBlock;
    name;
    per1;
    port;
    portRpc;
    protocol;
    seedsDns;
    unit;
    versions;
    bech32;
    messagePrefix;
    static Parse(d) {
        return ChainProxy.Create(JSON.parse(d));
    }
    static Create(d, field = 'root') {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        }
        else if (typeof (d) !== 'object') {
            throwNotObject(field, d, false);
        }
        else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkString(d.hashGenesisBlock, false, field + ".hashGenesisBlock");
        checkString(d.name, false, field + ".name");
        checkNumber(d.per1, true, field + ".per1");
        if (d.per1 === undefined) {
            d.per1 = null;
        }
        checkNumber(d.port, false, field + ".port");
        checkNumber(d.portRpc, true, field + ".portRpc");
        if (d.portRpc === undefined) {
            d.portRpc = null;
        }
        d.protocol = ProtocolProxy.Create(d.protocol, field + ".protocol");
        checkArray(d.seedsDns, field + ".seedsDns");
        if (d.seedsDns) {
            for (let i = 0; i < d.seedsDns.length; i++) {
                checkString(d.seedsDns[i], false, field + ".seedsDns" + "[" + i + "]");
            }
        }
        if (d.seedsDns === undefined) {
            d.seedsDns = null;
        }
        checkString(d.unit, false, field + ".unit");
        d.versions = VersionsProxy.Create(d.versions, field + ".versions");
        checkString(d.bech32, true, field + ".bech32");
        if (d.bech32 === undefined) {
            d.bech32 = null;
        }
        checkString(d.messagePrefix, true, field + ".messagePrefix");
        if (d.messagePrefix === undefined) {
            d.messagePrefix = null;
        }
        return new ChainProxy(d);
    }
    constructor(d) {
        this.hashGenesisBlock = d.hashGenesisBlock;
        this.name = d.name;
        this.per1 = d.per1;
        this.port = d.port;
        this.portRpc = d.portRpc;
        this.protocol = d.protocol;
        this.seedsDns = d.seedsDns;
        this.unit = d.unit;
        this.versions = d.versions;
        this.bech32 = d.bech32;
        this.messagePrefix = d.messagePrefix;
    }
}
export class ProtocolProxy {
    magic;
    static Parse(d) {
        return ProtocolProxy.Create(JSON.parse(d));
    }
    static Create(d, field = 'root') {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        }
        else if (typeof (d) !== 'object') {
            throwNotObject(field, d, false);
        }
        else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.magic, false, field + ".magic");
        return new ProtocolProxy(d);
    }
    constructor(d) {
        this.magic = d.magic;
    }
}
export class VersionsProxy {
    bip32;
    bip44;
    private;
    public;
    scripthash;
    static Parse(d) {
        return VersionsProxy.Create(JSON.parse(d));
    }
    static Create(d, field = 'root') {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        }
        else if (typeof (d) !== 'object') {
            throwNotObject(field, d, false);
        }
        else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        d.bip32 = Bip32Proxy.Create(d.bip32, field + ".bip32");
        checkNumber(d.bip44, false, field + ".bip44");
        checkNumber(d.private, false, field + ".private");
        checkNumber(d.public, false, field + ".public");
        checkNumber(d.scripthash, false, field + ".scripthash");
        return new VersionsProxy(d);
    }
    constructor(d) {
        this.bip32 = d.bip32;
        this.bip44 = d.bip44;
        this.private = d.private;
        this.public = d.public;
        this.scripthash = d.scripthash;
    }
}
export class Bip32Proxy {
    private;
    public;
    static Parse(d) {
        return Bip32Proxy.Create(JSON.parse(d));
    }
    static Create(d, field = 'root') {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            throwNull2NonNull(field, d);
        }
        else if (typeof (d) !== 'object') {
            throwNotObject(field, d, false);
        }
        else if (Array.isArray(d)) {
            throwIsArray(field, d, false);
        }
        checkNumber(d.private, false, field + ".private");
        checkNumber(d.public, false, field + ".public");
        return new Bip32Proxy(d);
    }
    constructor(d) {
        this.private = d.private;
        this.public = d.public;
    }
}
function throwNull2NonNull(field, d) {
    return errorHelper(field, d, "non-nullable object", false);
}
function throwNotObject(field, d, nullable) {
    return errorHelper(field, d, "object", nullable);
}
function throwIsArray(field, d, nullable) {
    return errorHelper(field, d, "object", nullable);
}
function checkArray(d, field) {
    if (!Array.isArray(d) && d !== null && d !== undefined) {
        errorHelper(field, d, "array", true);
    }
}
function checkNumber(d, nullable, field) {
    if (typeof (d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, "number", nullable);
    }
}
function checkString(d, nullable, field) {
    if (typeof (d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
        errorHelper(field, d, "string", nullable);
    }
}
function errorHelper(field, d, type, nullable) {
    if (nullable) {
        type += ", null, or undefined";
    }
    throw new TypeError('Expected ' + type + " at " + field + " but found:\n" + JSON.stringify(d) + "\n\nFull object:\n" + JSON.stringify(obj));
}
