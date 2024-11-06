"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = exports.KeystoreType = void 0;
const keymanager_1 = require("./keymanager");
Object.defineProperty(exports, "KeystoreType", { enumerable: true, get: function () { return keymanager_1.KeystoreType; } });
const web3_js_1 = require("@solana/web3.js");
__exportStar(require("./instructionbuilder"), exports);
class core {
    constructor(keymanager, connection) {
        this.keymanager = keymanager;
        this.connection = connection;
    }
    static CreateAsync() {
        return __awaiter(this, arguments, void 0, function* (keystoreType = process.env.KEYSTORE_TYPE, connection) {
            console.log(`Creating Async: ${keystoreType}`);
            let keymanager;
            switch (keystoreType) {
                case keymanager_1.KeystoreType.Local:
                    {
                        const { LocalKeyManager } = yield Promise.resolve().then(() => require('./keymanagers/localkeymanager'));
                        keymanager = new LocalKeyManager();
                    }
                    break;
                case keymanager_1.KeystoreType.Ledger:
                    {
                        const { LedgerKeyManager } = yield Promise.resolve().then(() => require('./keymanagers/ledgerkeymanager'));
                        keymanager = yield LedgerKeyManager.createAsync();
                    }
                    break;
                case keymanager_1.KeystoreType.Turnkey:
                    {
                        const { TurnKeyManager } = yield Promise.resolve().then(() => require('./keymanagers/turnkeymanager'));
                        keymanager = new TurnKeyManager();
                    }
                    break;
                default:
                    throw new Error(`Unsupported keystore type.`);
            }
            // Use the provided connection or create a new one
            const conn = connection || new web3_js_1.Connection(process.env.RPC_URL, process.env.COMMITMENT);
            return new core(keymanager, conn);
        });
    }
    GetKeystoreType() {
        return process.env.KEYSTORE_TYPE;
    }
    BuildTransaction(ix, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Building Transaction`);
            const connection = this.connection;
            // create v0 compatible message
            console.log(`Getting latest blockhash`);
            let { blockhash } = yield connection.getLatestBlockhash();
            console.log(`Creating message`);
            const messageV0 = new web3_js_1.TransactionMessage({
                payerKey: payer,
                recentBlockhash: blockhash,
                instructions: ix,
            }).compileToV0Message();
            console.log(`Creating versioned transaction`);
            return new web3_js_1.VersionedTransaction(messageV0);
        });
    }
    SignTransaction(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            // Sign a transaction using keymanager.
            yield this.keymanager.sign(txn);
        });
    }
    SendTransaction(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send a transaction to the network.
            return this.connection.sendTransaction(txn);
        });
    }
}
exports.core = core;
