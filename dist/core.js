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
const web3_js_1 = require("@solana/web3.js");
const keymanager_1 = require("./keymanager");
Object.defineProperty(exports, "KeystoreType", { enumerable: true, get: function () { return keymanager_1.KeystoreType; } });
const ledgerkeymanager_1 = require("./keymanagers/ledgerkeymanager");
const localkeymanager_1 = require("./keymanagers/localkeymanager");
const turnkeymanager_1 = require("./keymanagers/turnkeymanager");
__exportStar(require("./instructionbuilder"), exports);
class core {
    constructor(keymanager, connection = new web3_js_1.Connection(process.env.RPC_URL, process.env.COMMITMENT)) {
        this.keymanager = keymanager;
        this.connection = connection;
    }
    static CreateAsync() {
        return __awaiter(this, arguments, void 0, function* (keystoreType = process.env.KEYSTORE_TYPE) {
            let keymanager;
            switch (keystoreType) {
                case keymanager_1.KeystoreType.Local:
                    keymanager = new localkeymanager_1.LocalKeyManager();
                    break;
                case keymanager_1.KeystoreType.Ledger:
                    keymanager = yield ledgerkeymanager_1.LedgerKeyManager.createAsync();
                    break;
                case keymanager_1.KeystoreType.Turnkey:
                    keymanager = new turnkeymanager_1.TurnKeyManager();
                    break;
                default:
                    throw new Error(`Unsupported keystore type.`);
            }
            return new core(keymanager);
        });
    }
    GetKeystoreType() {
        return process.env.KEYSTORE_TYPE;
    }
    BuildTransaction(ix, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = this.connection;
            // create v0 compatible message
            let { blockhash } = yield connection.getLatestBlockhash();
            const messageV0 = new web3_js_1.TransactionMessage({
                payerKey: payer,
                recentBlockhash: blockhash,
                instructions: ix,
            }).compileToV0Message();
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
