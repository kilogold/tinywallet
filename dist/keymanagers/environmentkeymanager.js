"use strict";
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
exports.EnvironmentKeyManager = void 0;
const web3_js_1 = require("@solana/web3.js");
class EnvironmentKeyManager {
    constructor() {
        const secretKey = process.env.ENV_PRIVATE_KEY;
        if (!secretKey) {
            throw new Error("ENV_PRIVATE_KEY is not set in the environment variables.");
        }
        const secretKeyArray = Uint8Array.from(JSON.parse(secretKey));
        this.keypair = web3_js_1.Keypair.fromSecretKey(secretKeyArray);
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.keypair.publicKey.toBase58();
        });
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.keypair.publicKey;
        });
    }
    sign(txn) {
        txn.sign([this.keypair]);
    }
    // Optional methods can be implemented if needed
    generateKey() {
        throw new Error("generateKey is not supported in EnvironmentKeyManager.");
    }
    purgeKey() {
        throw new Error("purgeKey is not supported in EnvironmentKeyManager.");
    }
}
exports.EnvironmentKeyManager = EnvironmentKeyManager;
